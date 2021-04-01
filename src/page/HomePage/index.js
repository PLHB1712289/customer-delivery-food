import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import apiService from "./apiService";
import Localization from "../../config/Localization";
import DataUtils from "../../utils/DataUtils";
import ImageUtils from "../../utils/ImageUtils";
import CardSum from "../../component/HomePage/CardFoodSum";
import Address from "../../component/HomePage/Address";
import "./styles.css";
import ListItems from "../../component/HomePage/ListItems";

const Footer = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  const [listItem, setListItem] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMoreItem = () => {
    setIsLoading(true);

    (async () => {
      const arr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
      await new Promise((res) => setTimeout(res, 2000));
      setIsLoading(false);
      setListItem((prev) => prev.concat(arr));
    })();
  };

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
            <ListItems
              shoudDisplayLoading={isLoading}
              lable="Bán chạy"
              onClickShowAll={() => {
                alert("Show all");
              }}
              onClickShowMore={handleLoadMoreItem}
            >
              {listItem.map((i) => {
                return (
                  <Grid item md={4} key={i}>
                    <CardSum />
                  </Grid>
                );
              })}
            </ListItems>
          </Grid>
        </Grid>
        {/* <Grid item md={1} xs={0}></Grid> */}
      </Grid>
    </>
  );
};

export default Footer;
