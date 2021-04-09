import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomDialog, useDialog } from "react-st-modal";
import OtpInput from "react-otp-input";

import { Button } from "@material-ui/core";

// service
import "./styles.css";
import action from "../../../storage/action";
import service from "./service";
import store from "../../../storage";
// config
import Localization from "../../../config/Localization";
import SignInConfig from "../../../config/SignInConfig";
// utils
import ImageUtils from "../../../utils/ImageUtils";

// The element to be shown in the modal window
export default function PopupSignInWithPhone(props) {
  const { renderHomPage } = props;

  // use this hook to control the dialog
  const dialog = useDialog();
  // use dispatch
  const dispatch = useDispatch();
  // use history
  const history = useHistory();

  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [disable, setDisable] = useState("disabled");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // handle change OTP
  const handleChange = (otp) => {
    setOTP(otp.toString());
  };

  // hancdle change phone number
  const handleChangePhoneNumber = (e) => {
    const value = e.target.value.toString();
    setPhoneNumer(e.target.value);
    if (value.length !== 10) {
      setDisable("disabled");
    } else {
      setDisable("");
    }
  };

  // handle submit phone number
  const handleSubmitPhoneNumber = () => {
    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        // request to server
        let { status, message, data } = await service.vertifyPhoneNumber(phoneNumber, 0);

        dispatch(action.loadingAction.turnOff());

        status = parseInt(status);
        switch (status) {
          case SignInConfig.VERTIFY_PHONE_NUMBER_STATUS.SUCESS:
            setErrorMsg("");
            setIsOTP(true);
            return;
          case SignInConfig.VERTIFY_PHONE_NUMBER_STATUS.INVALID:
            setErrorMsg(Localization.text("txt_invalid_phone_number"));
            return;
        }
      } catch (e) {
        console.log(`[HandleSignInNumberPhone]: ${e.message}`);
      }
    })();
  };

  // handle submit otp
  const handleSubmitOTP = () => {
    if (otp.length !== 6) {
      setErrorMsg(Localization.text("txt_invalid_otp"));
    } else {
      dispatch(action.loadingAction.turnOn());
      (async () => {
        try {
          let { status, message, data } = await service.inputOTP(otp, 0);

          dispatch(action.loadingAction.turnOff());

          status = parseInt(status);
          switch (status) {
            case SignInConfig.VERTIFY_OTP_STATUS.SUCESS:
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
              dialog.close();
              renderHomPage();
              return;
            case SignInConfig.VERTIFY_OTP_STATUS.WRONG:
              setErrorMsg(Localization.text("txt_invalid_otp"));
              return;
          }
        } catch (e) {
          alert("Không thể kết nối với server.");
          console.error(`[Handle_SignInNumberPhone_OTP]: ${e.message}`);
        }
      })();
    }
  };

  return (
    <div className="popupSignInPhoneNumber_panel">
      <img
        className="popupSignInPhoneNumber_logo"
        src={ImageUtils.getLogoElip()}
      ></img>
      {!isOTP ? (
        <form>
          <div className="popupSignInPhoneNumber_error">{errorMsg}</div>
          <label>
            <input
              onChange={handleChangePhoneNumber}
              className="popupSignInPhoneNumber_input"
              type="number"
              value={phoneNumber}
              placeholder={Localization.text("txt_input_your_phone")}
            />
          </label>
          <input
            onClick={handleSubmitPhoneNumber}
            className="popupSignInPhoneNumber_button"
            type="button"
            disabled={disable}
            value={Localization.text("txt_submit")}
          />
        </form>
      ) : (
        <div className="popupSignInPhoneNumber_otp">
          <OtpInput
            value={otp}
            inputStyle={{
              width: "100%",
              height: "200%",
              marginRight: "15%",
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
          <div className="popupSignInPhoneNumber_error">{errorMsg}</div>
          <div className="popupSignInPhoneNumber_resendOTP">
            {Localization.text("txt_resend_otp")}
          </div>
          <Button className="popupSignInPhoneNumber_button" onClick={handleSubmitOTP}>
            {Localization.text("txt_submit")}
          </Button>
        </div>
      )}
    </div>
  );
}