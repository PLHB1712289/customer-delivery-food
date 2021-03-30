import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";

import PhoneInput from "react-phone-number-input";

import action from "../../storage/action";
import apiService from "./apiService";
import useStyles from "./styles";
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";

import ArrayUtils from "../../utils/ArrayUtils";

const Footer = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();
  // Styles
  const classes = useStyles();

  const userID = localStorage.getItem("userID");

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

              <PhoneInput
                defaultCountry="RU"
                placeholder="Enter phone number"
              />
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
