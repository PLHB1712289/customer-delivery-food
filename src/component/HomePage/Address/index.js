import { Grid } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React from "react";
import "./styles.css";

const Address = () => {
  return (
    <Grid
      container
      className="Address"
      onClick={() => {
        alert("ADDRESS");
      }}
    >
      <div className="Address__input-address">
        <span>Đồ ăn</span> <ArrowRightAltIcon style={{ margin: "0 5px" }} /> Địa
        chỉ giao hàng
      </div>

      <NavigateNextIcon />
    </Grid>
  );
};

export default Address;
