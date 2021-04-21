import { Grid } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useState } from "react";
import StrUtils from "../../../utils/StrUtils";
import DialogChangeAddress from "../DialogChangeAddress";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import addressDeliverAction from "../../../storage/action/addressDeliveryAction";

const Address = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const address = useSelector((state) => state.addressDelivery.address);
  const setAddress = (address) => {
    dispatch(addressDeliverAction.updateAddress(address));
  };

  return (
    <>
      <DialogChangeAddress
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        onUpdateAddress={(address) => {
          if (address) setAddress(address);
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
          {StrUtils.formatAddressCustomer(address)}
        </div>

        <NavigateNextIcon />
      </Grid>
    </>
  );
};

export default Address;
