import { Grid } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useState } from "react";
import DialogChangeAddress from "../DialogChangeAddress";
import "./styles.css";

const Address = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DialogChangeAddress
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
      <Grid
        item
        xs={12}
        className="Address"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <div className="Address__input-address">
          <span>Đồ ăn</span> <ArrowRightAltIcon style={{ margin: "0 5px" }} />{" "}
          Địa chỉ giao hàng
        </div>

        <NavigateNextIcon />
      </Grid>
    </>
  );
};

export default Address;
