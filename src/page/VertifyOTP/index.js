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
// config
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";
// utils
import ArrayUtils from "../../utils/ArrayUtils";

import "./styles.css";

const InputOTP = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();
  // use state
  const [otp, setOTP] = useState("");

  const handleChange = otp => {
      console.log("otp: " + otp);
      setOTP(otp);
  }

  return (
    <>
      <Grid container className="inputOPT_global">
        <Grid container item md={12}>
          <Grid item md={3}></Grid>

          <Grid item md={6}>
            <div className="inputOPT_panel">
              <p className="inputOPT_title">Nhập mã OTP</p>
              {/* Button Login With Phone */}

              {/* Input OTP */}
              <div className="inputOPT_spanInput">
                  <OtpInput 
                  value={otp}
                  inputStyle={{width: "1000%", height: "200%", marginRight: "10%", textAlign: "center", fontColor: "black", fontWeight: "bold", fontSize: "1rem"}} 
                  onChange={handleChange}
                  numInputs={6} 
                  shouldAutoFocus={true}
                  isInputNum={true}
                  separator={<span></span>} 
                  />
              </div>

              <Button className="inputOPT_button">Xác nhận</Button>           
            </div>
          </Grid>

          <Grid item md={3}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InputOTP;
