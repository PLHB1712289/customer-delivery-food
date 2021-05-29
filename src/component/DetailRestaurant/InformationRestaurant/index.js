import { Grid } from "@material-ui/core";
import React from "react";
import Rating from "./Rating";
import "./styles.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import RestaurantConfig from "../../../config/RestaurantConfig";
import { useSelector } from "react-redux";

const InformationRestaurant = () => {
  const {
    Avatar,
    location,
    Name,
    FullAddress,
    totalRating,
    rating,
    OpenHours,
    Anouncement,
    priceAvg,
  } = useSelector((state) => state.cart.infoRestaurant);

  const city = useSelector((state) => state.city);

  return (
    <Grid
      item
      container
      xs={12}
      spacing={2}
      className="information-restaurant__container"
    >
      <Grid item xs={5}>
        <div className="information-restaurant__thumbnail">
          <img alt="" src={Avatar} />
        </div>
      </Grid>
      <Grid item xs={7}>
        <div className="information-restaurant__location">{RestaurantConfig.CITY[city].name + " >> " + Name}</div>
        <div className="information-restaurant__like">
          <ThumbUpAltIcon style={{ width: 20, marginRight: 5 }} />
          Yêu thích
        </div>
        <div className="information-restaurant__name-restaurant">{Name}</div>
        <div className="information-restaurant__address-restaurant">
          {FullAddress}
        </div>
        <div className="information-restaurant__vote-and-review-restaurant">
          <Rating rate={1} />
          <div className="information-restaurant__review-restaurant">
            <div className="information-restaurant__count-review">
              {"100+"}
            </div>
            lượt đánh giá
          </div>
        </div>
        <div className="information-restaurant__time-open-restaurant">
          <span>Mở cửa:</span> {OpenHours[0] + " - " + OpenHours[1]}
        </div>
        <div className="information-restaurant__price-restaurant">
          <span>Thông báo:</span> {Anouncement}
        </div>
      </Grid>
    </Grid>
  );
};

export default InformationRestaurant;
