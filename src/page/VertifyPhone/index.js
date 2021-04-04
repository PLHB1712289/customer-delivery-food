import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { Dialpad } from "@material-ui/icons";
import OtpInput from 'react-otp-input';
// service
import action from "../../storage/action";
import apiService from "./apiService";
// config
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";
// utils
import ArrayUtils from "../../utils/ArrayUtils";

import "./styles.css";

const VertifyPhoneNumber = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  const userID = localStorage.getItem("userID");

  return (
    <>
      <Grid container className="vertifyPhoneNumber_global">
        <Grid container item md={12}>
          <Grid item md={3}></Grid>

          <Grid item md={6}>
            <div className="vertifyPhoneNumber_panel">
              <p className="vertifyPhoneNumber_title">Xác thực số điện thoại</p>
              {/* Button Login With Phone */}

              {/* Input phone number */}
              <div className="vertifyPhoneNumber_spanInput">
                <OutlinedInput
                  className="vertifyPhoneNumber_input"
                  id="phone_Number"
                  placeholder="Your Phone Number"
                  type="text"
                  startAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="start">
                        <Dialpad />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>

              <Button className="vertifyPhoneNumber_button">Xác nhận</Button>
              {/* <OtpInput value={"aa"} inputStyle={{width: "100px"}} numInputs={6} separator={<span style={{width: "100px"}}></span>} /> */}
            </div>
          </Grid>

          <Grid item md={3}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VertifyPhoneNumber;
