import { Grid } from "@material-ui/core";
import React from "react";
import Address from "../../component/HomePage/Address";
import FilterRestaurant from "../../component/HomePage/FilterRestaurant";
import ListRestaurantBestSeller from "../../component/HomePage/ListRestaurantBestSeller";
import ListVoucher from "../../component/HomePage/ListVoucher";
import Localization from "../../config/Localization";
import DataUtils from "../../utils/DataUtils";
import ImageUtils from "../../utils/ImageUtils";
import "./styles.css";

const Footer = () => {
  // local state
  const listTypeCat = DataUtils.getListTypeOfFoodHomePage("tag");

  return (
    <>
      <Grid container className="homepage__container">
        <Grid container item md={12} className="homepage__container">
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
            <Address />
            <FilterRestaurant />
            <ListRestaurantBestSeller />
            <ListVoucher />
          </Grid>
        </Grid>
        {/* <Grid item md={1} xs={0}></Grid> */}
      </Grid>
    </>
  );
};

export default Footer;
