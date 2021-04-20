import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useRef, useState } from "react";
import {
  geoConvertAddressToLatLong,
  geoConvertLatLongToAddress,
} from "../../../utils/Geocode";
import "./styles.css";
import Map from "./Map";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const titleDialog = "Bạn muốn giao đến đâu?";
const tileAlertLocation = "Vui lòng cấp quyền truy cập vị trí cho flashfood";

export default function DialogChangeAddress({
  open,
  onClose,
  onUpdateAddress,
}) {
  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    onUpdateAddress(location);
  }, [location, lat, lng]);

  const typingTimeoutRef = useRef(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const updateCurrentLocation = async (pos) => {
    const { latitude, longitude } = pos.coords;
    const address = await geoConvertLatLongToAddress(latitude, longitude);
    setLocation(address);
    setLat(latitude);
    setLng(longitude);
  };

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const hanleGetCurrentLocation = async (callback) => {
    if (navigator.geolocation) {
      const result = await navigator.permissions.query({ name: "geolocation" });

      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(callback);
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(callback, errors, options);
      } else if (result.state === "denied") {
        alert(tileAlertLocation);
      }

      result.onchange = function () {
        console.log(result.state);
      };
    } else {
      alert("Sorry Not available!");
    }
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const { lat, lng } = await geoConvertAddressToLatLong(e.target.value);
      setLat(lat);
      setLng(lng);
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      transitionDuration={{ appear: 400, enter: 500, exit: 300 }}
      TransitionComponent={Transition}
      maxWidth="md"
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <IconButton
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          borderRadius: 2,
          padding: 2,
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle
        id="alert-dialog-slide-title"
        className="dialog-change-address__title"
      >
        {titleDialog}
      </DialogTitle>
      <DialogContent>
        <div className="dialog-change-address__input-location">
          <SearchIcon fontSize="small" />
          <input
            style={{ width: "100%" }}
            value={location || ""}
            onChange={handleChangeLocation}
          />
          {location ? (
            <CancelIcon
              fontSize="small"
              style={{ cursor: "pointer" }}
              onClick={() => setLocation(null)}
            />
          ) : (
            <MyLocationIcon
              fontSize="small"
              style={{ cursor: "pointer" }}
              onClick={() => hanleGetCurrentLocation(updateCurrentLocation)}
            />
          )}
        </div>
        <Map lat={lat} lng={lng} tagMarker="Bạn" />
      </DialogContent>
    </Dialog>
  );
}
