import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CustomDialog, useDialog } from "react-st-modal";
import { Button, Grid, Avatar } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

// serivce
import "./styles.css";
import action from "../../../storage/action";
// config
import Localization from "../../../config/Localization";
// utils
import DataUtils from "../../../utils/DataUtils";

const SideBar = () => {
  // React router hook
  const history = useHistory();
  const location = useLocation();
  // use dispatch
  const dispatch = useDispatch();


  return (
    <div className="profile_paymentMethod_global">
      <Grid container>
        <Grid item md={12}>
          <div className="profile_paymentMethod_title">
            Phương thức thanh toán
          </div>
          <hr className="profile_paymentMethod_breakLine"></hr>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
