import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import service from "./service";
// config
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";
import SignInConfig from "../../config/SignInConfig";
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
  const [isValidOTP, setIsValidOTP] = useState(true);

  // userID
  let { userID } = useSelector((state) => state.profile);
  if (userID === -1) {
    userID = localStorage.getItem("userID");
  }

  // handle change OTP
  const handleChange = (otp) => {
    setOTP(otp.toString());
  };

  // handle submit OTP
  const handleSubmit = () => {
    if (otp.length !== 6) {
      setIsValidOTP(false);
    } else {
      dispatch(action.loadingAction.turnOn());
      (async () => {
        try {
          const { success, message, data } = await service.inputOTP(otp, 0);

          dispatch(action.loadingAction.turnOff());

          if (success) {
            const status = parseInt(data.status);
            switch (status) {
              case SignInConfig.VERTIFY_OTP_STATUS.SUCESS:
                handleGetUserInfo(userID);
                return;
              case SignInConfig.VERTIFY_OTP_STATUS.WRONG:
                setIsValidOTP(false);
                return;
            }
          }
        } catch (e) {
          alert("Không thể kết nối với server.");
          console.error(`[LIST_RESTAURANT]: ${e.message}`);
        }
      })();
    }
  };

  // handle get UserInfo
  const handleGetUserInfo = () => {
    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        const { success, message, data } = await service.getUserInfo(userID);

        dispatch(action.loadingAction.turnOff());

        if (success) {
          const token = data.token;
          const userID = data.userID;
          const fullName = data.fullName;
          const avatarUrl = data.avatarUrl;
          // set token - profile
          // redux
          dispatch(action.tokenAction.signIn(token));
          dispatch(action.profileAction.signIn(userID, fullName, avatarUrl));
          // localstorage
          localStorage.setItem("token", token);
          localStorage.setItem("userID", userID);
          localStorage.setItem("avatar", avatarUrl);
          localStorage.setItem("fullName", fullName);
          // push history
          history.push("/");
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_RESTAURANT]: ${e.message}`);
      }
    })();
  };

  return (
    <>
      <Grid container className="inputOPT_global">
        <Grid container item md={12}>
          <Grid item md={3}></Grid>

          <Grid item md={6}>
            <div className="inputOPT_panel">
              <p className="inputOPT_title">
                {Localization.text("txt_enter_otp")}
              </p>
              {/* Button Login With Phone */}

              {/* Input OTP */}
              <div className="inputOPT_spanInput">
                <OtpInput
                  value={otp}
                  inputStyle={{
                    width: "1000%",
                    height: "200%",
                    marginRight: "10%",
                    textAlign: "center",
                    fontColor: "black",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  onChange={handleChange}
                  numInputs={6}
                  shouldAutoFocus={true}
                  isInputNum={true}
                  separator={<span></span>}
                />
              </div>
              {isValidOTP ? (
                <div className="inputOTP_error"></div>
              ) : (
                <div className="inputOTP_error">
                  {Localization.text("txt_invalid_otp")}
                </div>
              )}
              <Button className="inputOPT_button" onClick={handleSubmit}>
                {Localization.text("txt_confirm")}
              </Button>
            </div>
          </Grid>

          <Grid item md={3}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InputOTP;
