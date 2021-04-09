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
import {} from "@material-ui/icons";

// componets
import SideBar from "../../component/Profile/SideBar";

// serivce
import action from "../../storage/action";
import store from "../../storage";
import "./styles.css";
// config
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";
import SignInConfig from "../../config/SignInConfig";

import ArrayUtils from "../../utils/ArrayUtils";

const Profile = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  let { token } = useSelector((state) => state.token);
  if (token === null) {
    token = localStorage.getItem("token");
    if (token === null) {
      history.push("/sign-in");
    }
  }

  return (
    <>
      <Grid container className="profile_global">
        <Grid container item md={3}>
          <SideBar></SideBar>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
