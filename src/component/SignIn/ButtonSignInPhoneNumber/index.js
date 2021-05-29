import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import { Button } from "@material-ui/core";

// service
import "./styles.css";
import action from "../../../storage/action";
import apiService from "./apiService";
// config
import Localization from "../../../config/Localization";
import SignInConfig from "../../../config/SignInConfig";
// utils
import ImageUtils from "../../../utils/ImageUtils";
import JwtUtils from "../../../utils/JwtUtils";

// The element to be shown in the modal window
export default function PopupSignInWithPhone(props) {
  const { renderHomePage } = props;
  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [disable, setDisable] = useState("disabled");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // use dispatch
  const dispatch = useDispatch();

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
        let { errorCode, data } = await apiService.signInWithPhoneNumber(
          phoneNumber
        );

        dispatch(action.loadingAction.turnOff());

        switch (errorCode) {
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
          let { errorCode, data } = await apiService.vertifyOTP(
            phoneNumber,
            otp
          );

          dispatch(action.loadingAction.turnOff());

          if (errorCode === 0) {
            const token = data.token;
            dispatch(action.tokenAction.signIn(token));
            localStorage.setItem("token", token);
            handleGetUserInfo(token);
          } else {
            setErrorMsg(Localization.text("txt_invalid_otp"));
          }
        } catch (e) {
          alert("Không thể kết nối với server.");
          console.error(`[Handle_SignInNumberPhone_OTP]: ${e.message}`);
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
        let phone = data.user.Phone;

        if (errorCode === 0) {
          // redux
          dispatch(
            action.profileAction.signIn(userID, fullName, avatar, phone)
          );
          // localstorage
          localStorage.setItem("userID", userID);
          localStorage.setItem("avatar", avatar);
          localStorage.setItem("fullName", fullName);
          localStorage.setItem("phone", phone);
          // history
          renderHomePage();
        }
      } catch (e) {
        console.log(`[HANDLE_GET_USERINFO_FAILED]: ${e.message}`);
      }
    })();
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
          <Button
            className="popupSignInPhoneNumber_button"
            onClick={handleSubmitOTP}
          >
            {Localization.text("txt_submit")}
          </Button>
        </div>
      )}
    </div>
  );
}
