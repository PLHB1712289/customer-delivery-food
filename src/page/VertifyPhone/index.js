import React, { useState } from "react";
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
// service
import action from "../../storage/action";
import apiService from "./apiService";
import service from "./service";
// config
import Localization from "../../config/Localization";
import SignInConfig from "../../config/SignInConfig";
// utils
import ArrayUtils from "../../utils/ArrayUtils";

import "./styles.css";

const VertifyPhoneNumber = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();
  // state
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // userID
  let { userID } = useSelector((state) => state.profile);
  if (userID === -1) {
    userID = localStorage.getItem('userID');
  }

  // handle event change input form
  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setPhoneNumber(value.toString());
  };

  // handle submit
  const handleSubmit = (e) => {
    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        // request to server
        const { success, message, data } = await service.vertifyPhoneNumber(
          0
        );

        dispatch(action.loadingAction.turnOff());

        if (success) {
          const status = parseInt(data.status);
          switch (status) {
            case SignInConfig.VERTIFY_PHONE_NUMBER_STATUS.SUCESS:
              // push history
              history.push("/input-otp");
              return;
            case SignInConfig.VERTIFY_PHONE_NUMBER_STATUS.PHONE_NUMBER_USED:
              setErrorMsg("txt_phone_number_used");
              return;
            case SignInConfig.VERTIFY_PHONE_NUMBER_STATUS.INVALID:
              setErrorMsg("txt_invalid_phone_number");
              return;
          }
        }
      } catch (e) {
        console.log(`[HandleVertifyPhoneNumber]: ${e.message}`);
      }
    })();
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

              <div className="vertifyPhoneNumber_error">{Localization.text(errorMsg)}</div>

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
