import axios from "axios";
import Geocode from "react-geocode";

const API_KEY_GG = "AIzaSyD6SYKhvIlFDEehwE1iJU7Sjjhueb4PsmQ";
const URL_API_GG_DIRECTION = (origin, destination) => {
  const formalOrigin = origin.split(" ").join("%20");
  const formalDestination = destination.split(" ").join("%20");
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${formalOrigin}&destination=${formalDestination}&key=${API_KEY_GG}`;
};

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(API_KEY_GG);

// set response language. Defaults to english.
Geocode.setLanguage("vi");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("us");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latitude & longitude.
export const geoConvertLatLongToAddress = async (lat, lng) => {
  try {
    const response = await Geocode.fromLatLng(lat, lng);
    const address = response.results[0].formatted_address;

    return address;
  } catch (e) {
    console.log(`[Geo_ConvertLatLongToAddress]: ${e.message}`);
    return "";
  }
};

// Get latitude & longitude from address.
export const geoConvertAddressToLatLong = async (address) => {
  try {
    const res = await Geocode.fromAddress(address);
    const { lat, lng } = res.results[0].geometry.location;
    return { lat, lng };
    return res;
  } catch (e) {
    console.log(`[Geo_ConvertAddressToLatLong]: ${e.message}`);
    return { lat: 0, lng: 0 };
  }
};

export const geoDistanceBetween2Address = async (address1, address2) => {
  try {
    console.log(`[GETO_DISTANCE_BETWEEN_2_ADDRESS]`);
    console.log(URL_API_GG_DIRECTION(address1, address2));
    // const res = await axios.get(URL_API_GG_DIRECTION(address1, address2));
    const res = await fetch(URL_API_GG_DIRECTION(address1, address2));
    // const data = res.data;
    console.log(res);
  } catch (e) {
    console.log(`[GETO_DISTANCE_BETWEEN_2_ADDRESS]: ${e.message}`);
  }
};

export const geoDistanceBetween2Coor = async (coor1, coor2) => {
  const address1 = await geoConvertLatLongToAddress(coor1.lat, coor1.lng);
  const address2 = await geoConvertLatLongToAddress(coor2.lat, coor2.lng);

  return await geoDistanceBetween2Address(address1, address2);
};
