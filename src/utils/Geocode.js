import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyD6SYKhvIlFDEehwE1iJU7Sjjhueb4PsmQ");

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
  }
};

// Get latitude & longitude from address.
export const geoConvertAddressToLatLong = async (address) => {
  try {
    const { lat, lng } = await Geocode.fromAddress(address);
    return { lat, lng };
  } catch (e) {
    console.log(`[Geo_ConvertAddressToLatLong]: ${e.message}`);
  }
};
