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
import OtpInput from "react-otp-input";
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
  // state
  const [phoneNumber, setPhoneNumber] = useState("");

  // handle event change input form
  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setPhoneNumber(value.toString());
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone Number: " + phoneNumber);
    history.push("/input-otp");
  };

  return (
    <>
      <Grid container className="vertifyPhoneNumber_global">
        <Grid container item md={12}>
          <Grid item md={3}></Grid>

          <Grid item md={6}>
            <div className="vertifyPhoneNumber_panel">
              <p className="vertifyPhoneNumber_title">{Localization.text("txt_vertify_phone_number")}</p>
              {/* Button Login With Phone */}

              {/* Input phone number */}
              <div className="vertifyPhoneNumber_spanInput">
                <OutlinedInput
                  onChange={handleChangePhoneNumber}
                  className="vertifyPhoneNumber_input"
                  id="phone_Number"
                  placeholder={Localization.text("txt_your_phone_number")}
                  type="number"
                  startAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="start">
                        <Dialpad />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>

              <Button
                className="vertifyPhoneNumber_button"
                onClick={handleSubmit}
              >
                {Localization.text("txt_confirm")}
              </Button>
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
