import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

const defaultSize = 30;
const Marker = ({ size = defaultSize, name }) => {
  return (
    <div
      style={{
        width: size,
        height: size,

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -60%)",
      }}
    >
      <LocationOnIcon style={{ width: size, height: size, color: "red" }} />
      <div
        style={{
          fontWeight: 700,
          background: "white",
          padding: 5,
          textAlign: "center",
        }}
      >
        {name}
      </div>
    </div>
  );
};

const Shipper = ({ size = defaultSize, name }) => {
  return (
    <div
      style={{
        width: size,
        height: size,

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -60%)",
      }}
    >
      <MotorcycleIcon
        style={{ width: size, height: size, color: "red" }}
      />
      <div
        style={{
          fontWeight: 700,
          background: "white",
          padding: 5,
          textAlign: "center",
        }}
      >
        {name}
      </div>
    </div>
  );
};

const Map = ({
  lat = 0,
  lng = 0,
  tagMarker = "Vị trí của bạn",
  latShip = 0.1,
  lngShip = 0.1,
  tagShip = "Tài xế",
}) => {
  const [zoom, setZoom] = useState(18);
  const center = { lat, lng };
  const fakeCenter = { lat: 10, lng: 10};
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "62vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD6SYKhvIlFDEehwE1iJU7Sjjhueb4PsmQ" }}
        defaultCenter={center}
        center={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker
          size={(zoom / 15) * defaultSize}
          name={tagMarker}
          lat={lat}
          lng={lng}
        />
        <Shipper
          size={(zoom / 15) * defaultSize}
          name={tagShip}
          lat={latShip}
          lng={lngShip}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
