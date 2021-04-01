import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import apiService from "./apiService";
import Localization from "../../config/Localization";
import DataUtils from "../../utils/DataUtils";
import ImageUtils from "../../utils/ImageUtils";
import CardSum from "../../component/HomePage/CardFoodSum";
import Address from "../../component/HomePage/Address";
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
            <Grid container md={12}>
              <Address />
            </Grid>
            <Grid container md={12} className="panel-food">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                return (
                  <Grid item md={4} key={i}>
                    <CardSum />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item md={1} xs={0}></Grid> */}
      </Grid>
    </>
  );
};

export default Footer;
