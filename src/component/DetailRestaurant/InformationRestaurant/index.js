import { Grid } from "@material-ui/core";
import React from "react";
import Rating from "./Rating";
import "./styles.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useSelector } from "react-redux";

const InformationRestaurant = () => {
  const {
    thumbnail,
    location,
    name,
    address,
    totalRating,
    rating,
    timeOpenRestaurant,
    priceAvg,
  } = useSelector((state) => state.cart.infoRestaurant);

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
          <img alt="" src={thumbnail} />
        </div>
      </Grid>
      <Grid item xs={7}>
        <div className="information-restaurant__location">{location}</div>
        <div className="information-restaurant__like">
          <ThumbUpAltIcon style={{ width: 20, marginRight: 5 }} />
          Yêu thích
        </div>
        <div className="information-restaurant__name-restaurant">{name}</div>
        <div className="information-restaurant__address-restaurant">
          {address}
        </div>
        <div className="information-restaurant__vote-and-review-restaurant">
          <Rating rate={rating} />
          <div className="information-restaurant__review-restaurant">
            <div className="information-restaurant__count-review">
              {totalRating}
            </div>
            lượt đánh giá
          </div>
        </div>
        <div className="information-restaurant__time-open-restaurant">
          <span>Mở cửa:</span> {timeOpenRestaurant}
        </div>
        <div className="information-restaurant__price-restaurant">
          <span>Giá tiền:</span> {priceAvg}
        </div>
      </Grid>
    </Grid>
  );
};

export default InformationRestaurant;
