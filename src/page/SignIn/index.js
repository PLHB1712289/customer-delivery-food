import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomDialog, useDialog } from "react-st-modal";
import {
  Button,
  Grid,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import {
  Facebook,
  AccountCircle,
  Lock,
  PhoneAndroid,
  GitHub,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

import PopupSignInPhoneNumber from "../../component/SignIn/ButtonSignInPhoneNumber";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

// serivce
import action from "../../storage/action";
import apiService from "./apiService";
import service from "./service";
import useStyles from "./styles";
import store from "../../storage";
// config
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";
import SignInConfig from "../../config/SignInConfig";

import ArrayUtils from "../../utils/ArrayUtils";
import JwtUtils from "../../utils/JwtUtils";

const Footer = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();
  // Styles
  const classes = useStyles();

  // local state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Token
  let { token } = useSelector((state) => state.token);
  if (token === null) {
    token = localStorage.getItem("token");
    if (token !== null) {
      history.push("/");
    }
  }

  // handle render home page
  const renderHomePage = () => {
    history.push("/");
  };

  // handle signin with phone number
  const handleSignInPhoneNumber = async () => {
    const result = await CustomDialog(
      <Provider store={store}>
        <PopupSignInPhoneNumber renderHomePage={renderHomePage} />
      </Provider>,
      {}
    );
  };

  // region local handle
  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  // handle event change input form
  const handleChangeUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  // handle event login normal
  const handleSubmitForm = async (e) => {
    const id = 1;
    const accessToken = 1;

    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        // request to server
        const { success, message, data } = await service.loginVetify();

        dispatch(action.loadingAction.turnOff());

        if (success) {
          let token = null;
          let userID = null;
          let fullName = null;
          let avatarUrl = null;
          const status = parseInt(data.status);

          switch (status) {
            case SignInConfig.STATUS.SUCESS:
              token = data.token;
              userID = data.userID;
              fullName = data.fullName;
              avatarUrl = data.avatarUrl;
              // set token - profile
              // redux
              dispatch(action.tokenAction.signIn(token));
              dispatch(
                action.profileAction.signIn(userID, fullName, avatarUrl)
              );
              // localstorage
              localStorage.setItem("token", token);
              localStorage.setItem("userID", userID);
              localStorage.setItem("avatar", avatarUrl);
              localStorage.setItem("fullName", fullName);
              // push history
              history.push("/");
              return;
            case SignInConfig.STATUS.VERTIFY:
              userID = data.userID;
              // redux
              dispatch(action.profileAction.signIn(userID, "", ""));
              // push history
              history.push("/vertify-phone");
              return;
            case SignInConfig.STATUS.WRONG:
              setErrMsg("Thông tin đăng nhập không chính xác");
              return;
          }
        }

        alert(message);
      } catch (e) {
        console.log(`[Login Failed]: ${e.message}`);
      }
    })();
  };

  // handle login facebook
  const handleSignInFacebook = (res) => {
    const id = res.id;
    const accessToken = res.accessToken;

    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        // request to server
        const { success, message, data } = await apiService.signInWithGG(
          id,
          accessToken
        );

        dispatch(action.loadingAction.turnOff());

        if (success) {
          let token = null;
          let userID = null;
          let fullName = null;
          let avatarUrl = null;
          const status = parseInt(data.status);

          switch (status) {
            case SignInConfig.STATUS.SUCESS:
              token = data.token;
              userID = data.userID;
              fullName = data.fullName;
              avatarUrl = data.avatarUrl;
              // set token - profile
              // redux
              dispatch(action.tokenAction.signIn(token));
              dispatch(
                action.profileAction.signIn(userID, fullName, avatarUrl)
              );
              // localstorage
              localStorage.setItem("token", token);
              localStorage.setItem("userID", userID);
              localStorage.setItem("avatar", avatarUrl);
              localStorage.setItem("fullName", fullName);
              history.push("/");
              return;
            case SignInConfig.STATUS.VERTIFY:
              userID = data.userID;
              // redux
              dispatch(action.profileAction.signIn(userID, "", ""));
              // push history
              history.push("/vertify-phone");
              return;
            case SignInConfig.STATUS.WRONG:
              setErrMsg(Localization.text("txt_wrong_signin"));
              return;
          }
        }

        alert(message);
      } catch (e) {
        console.log(`[HANDLE_SIGNIN_GG_FAILED]: ${e.message}`);
      }
    })();
  };

  // handle Google facebook
  const handleSignInGoogle = (res) => {
    const tokenId = res.tokenId;
    const accessToken = res.accessToken;

    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        // request to server
        const { errorCode, data } = await apiService.signInWithGG(
          tokenId,
          accessToken
        );
        dispatch(action.loadingAction.turnOff());

        let token = null;
        let userID = null;
        let fullName = null;
        let avatarUrl = null;

        switch (errorCode) {
          case SignInConfig.STATUS.SUCESS:
            // login for the first
            if (data.user) {
              localStorage.setItem("user", data.user);
              history.push("/vertify-phone");
              return;
            }
            
            // login normal
            if (data.token !== null) {
              dispatch(action.tokenAction.signIn(data.token));
              localStorage.setItem("token", data.token);
              handleGetUserInfo(data.token);
              return;
            }

            return;
          case SignInConfig.STATUS.VERTIFY:
            userID = data.user;
            // redux
            dispatch(action.profileAction.signIn(userID, "", ""));
            // push history
            history.push("/vertify-phone");
            return;
          case SignInConfig.STATUS.WRONG:
            setErrMsg("Thông tin đăng nhập không chính xác");
            return;
        }
      } catch (e) {
        console.log(`[HANDLE_SIGNIN_GG_FAILED]: ${e.message}`);
      }
    })();
  };

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
          dispatch(action.profileAction.signIn(userID, fullName, avatar, phone));
          // localstorage
          localStorage.setItem("userID", userID);
          localStorage.setItem("avatar", avatar);
          localStorage.setItem("fullName", fullName);
          localStorage.setItem("phone", phone);
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
      <Grid container className={classes.global}>
        <Grid item md={1} xs={0}></Grid>
        <Grid container item md={12}>
          <Grid item md={3}></Grid>

          <Grid item md={6}>
            <div className={classes.panel}>
              <p className={classes.title}>{Localization.text("txt_login")}</p>
              {/* Button Login With Phone */}
              <Button
                onClick={handleSignInPhoneNumber}
                className={[classes.buttonPhone, classes.button].join(" ")}
              >
                <PhoneAndroid className={classes.buttonIcon} />
                <p className={classes.buttonText}>
                  {Localization.text("txt_phone")}
                </p>
              </Button>
              {/* <ButtonPhone></ButtonPhone> */}
              {/* Button Login With Facebook */}
              <FacebookLogin
                appId={AppConfig.FACEBOOK}
                fields="id,name,email"
                callback={handleSignInFacebook}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    className={[classes.buttonFacebook, classes.button].join(
                      " "
                    )}
                  >
                    <Facebook className={classes.buttonIcon} />
                    <p className={classes.buttonText}>FACEBOOK</p>
                  </Button>
                )}
              />
              {/* Button Login With Google */}
              <GoogleLogin
                clientId={AppConfig.GOOGLE}
                onSuccess={handleSignInGoogle}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={[classes.buttonGoogle, classes.button].join(" ")}
                  >
                    <GitHub className={classes.buttonIcon} />
                    <p className={classes.buttonText}>GOOGLE</p>
                  </Button>
                )}
              />

              {/* Div notify error */}
              <div
                className={classes.errorSpan}
                style={{ display: errMsg === "" ? "none" : "" }}
              >
                <div className={classes.errorText}>
                  Vui lòng nhập email hoặc số điện thoại
                </div>
              </div>

              {/* Div Text Login */}
              <div className={classes.spanOptionLogin}>
                {Localization.text("txt_optionSignIn")}
              </div>

              {/* Input Account */}
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-password"
                placeholder="Username or email"
                type="text"
                onChange={handleChangeUsername}
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="start">
                      <AccountCircle />
                    </IconButton>
                  </InputAdornment>
                }
              />

              {/* Input Password */}
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-password"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                onChange={handleChangePassword}
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="start"
                    >
                      <Lock />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      aria-label="toggle password visibility"
                      edge="start"
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {/* Cache Sign In */}
              <FormControl className={classes.checkBoxCacheSignIn}>
                <FormGroup row>
                  <FormControlLabel
                    style={{ fontSize: "10px", fontFamily: "Arial" }}
                    control={<Checkbox name="checkedB" color="disable" />}
                    label={Localization.text("txt_cacheSignIn")}
                  />
                  <FormLabel
                    style={{ fontSize: "10px", fontFamily: "Arial" }}
                    label="dsadsadasdas"
                  />
                </FormGroup>
              </FormControl>

              {/* Div Quên mật khẩu */}
              <div
                style={{
                  textAlign: "right",
                  marginRight: "5%",
                  marginTop: "20px",
                }}
              >
                <a href="#" style={{ textDecoration: "none" }}>
                  {Localization.text("txt_forgotPassword")}
                </a>
              </div>

              {/* Button Login  */}
              <Button
                className={[classes.buttonSignIn, classes.button].join(" ")}
                onClick={handleSubmitForm}
              >
                <p className={classes.buttonText}>
                  {Localization.text("txt_login").toUpperCase()}
                </p>
              </Button>

              {/* Div Policy */}
              <div className={classes.policy}>
                {Localization.text("txt_policy")}
              </div>
            </div>
          </Grid>

          <Grid item md={3}></Grid>
        </Grid>
        <Grid item md={1} xs={0}></Grid>
      </Grid>
    </>
  );
};

export default Footer;
