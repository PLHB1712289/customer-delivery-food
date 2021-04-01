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
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import ImageUtils from "../../utils/ImageUtils";
import DataUtils from "../../utils/DataUtils";

import action from "../../storage/action";
// import apiService from "./apiService";
import Localization from "../../config/Localization";

import CardSum from "./CardFoodSum";

import "./styles.css";

const Footer = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  // local state
  const listTypeCat = DataUtils.getListTypeOfFoodHomePage("tag");

  return (
    <>
      <Grid container className="container">
        <Grid container item md={12} className="container">
          <Grid item md={1}></Grid>
          <Grid item md={4}>
            <div className="card-title">
              <div className="orderTitle">
                {Localization.text("title_order_homepage")}
              </div>
              <div className="orderTut">
                {Localization.text("title_order_intro_homepage")}
              </div>
            </div>

            <div className="list-tag">{listTypeCat}</div>

            <div className="textGetApp">
              {Localization.text("txt_gui_download_app")}
            </div>

            <div className="list-app-image">
              <img className="app-image" src={ImageUtils.getGooglePlay()}></img>
              <img className="app-image" src={ImageUtils.getAppStore()}></img>
            </div>
          </Grid>

          <Grid item md={6} className="panel-scroll">
            <Grid container md={12} className="panel-food">
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
              <Grid item md={4}>
                <CardSum></CardSum>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item md={1} xs={0}></Grid> */}
      </Grid>
    </>
  );
};

export default Footer;
