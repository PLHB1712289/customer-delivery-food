import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import OtpInput from "react-otp-input";
// service
import action from "../../storage/action";
import service from "./service";
import apiService from "./apiService";
// config
import Localization from "../../config/Localization";
import SignInConfig from "../../config/SignInConfig";
// utils
import JwtUtils from "../../utils/JwtUtils";

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
          const user = localStorage.getItem("user");
          const { errorCode, data } = await apiService.vertifyOTP(user, otp);

          dispatch(action.loadingAction.turnOff());

          switch (errorCode) {
            case SignInConfig.VERTIFY_OTP_STATUS.SUCESS:
              const token = data.token;
              dispatch(action.tokenAction.signIn(token));
              localStorage.setItem("token", token);
              handleGetUserInfo(token);
              return;
            case SignInConfig.VERTIFY_OTP_STATUS.WRONG:
            case SignInConfig.VERTIFY_OTP_STATUS.PHONE_NOT_EXISTED:
              setIsValidOTP(false);
              return;
          }
        } catch (e) {
          alert("Không thể kết nối với server.");
          console.error(`[LIST_RESTAURANT]: ${e.message}`);
        }
      })();
    }
  };

  // handle get UserInfo
  const handleGetUserInfo = function (token) {
    var userId = JwtUtils.parseJwt(token).id;

    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        // request to server
        const { errorCode, data } = await apiService.getUserInfo(userId);
        dispatch(action.loadingAction.turnOff());

        let userID = data.user.id;
        let fullName = data.user.FullName;
        let avatar = data.user.Avatar;

        if (errorCode === 0) {
          // redux
          dispatch(action.profileAction.signIn(userID, fullName, avatar));
          // localstorage
          localStorage.setItem("userID", userID);
          localStorage.setItem("avatar", avatar);
          localStorage.setItem("fullName", fullName);
          // history
          history.push("/");
        }
      } catch (e) {
        console.log(`[HANDLE_GET_USERINFO_FAILED]: ${e.message}`);
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
