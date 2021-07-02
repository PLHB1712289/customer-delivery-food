import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Rating from "./Rating";
import "./styles.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import RestaurantConfig from "../../../config/RestaurantConfig";
import { useSelector } from "react-redux";
import DialogReview from "../DialogReview";
import shieldIcon from "@iconify/icons-entypo/shield";
import { Icon } from "@iconify/react";

const InformationRestaurant = (props) => {
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
    id,
  } = useSelector((state) => state.cart.infoRestaurant);

  const { data } = props;

  const city = useSelector((state) => state.city);
  const [openDialogReview, setOpenDialogReivew] = useState(false);

  return (
    <>
      <DialogReview
        open={openDialogReview}
        onClose={() => setOpenDialogReivew(false)}
        dataRestaurant={{
          Avatar: Avatar,
          Name: Name,
          FullAddress: FullAddress,
          id: id,
          rating: data.Rating,
          totalReviews: data.TotalReviews,
        }}
      />
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
          <div className="information-restaurant__location">
            {RestaurantConfig.CITY[city].name + " >> " + Name}
          </div>
          <div style={{ display: "flex", float: "left" }}>
            {data.Rating >= 4 ? (
              <div className="information-restaurant__like">
                <ThumbUpAltIcon style={{ width: 20, marginRight: 5 }} />
                Yêu thích
              </div>
            ) : (
              <></>
            )}
            {data.IsPartner ? (
              <div className="information-restaurant__partner">
                <Icon
                  icon={shieldIcon}
                  style={{
                    color: "#ffffff",
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
                Quán đối tác
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className="information-restaurant__name-restaurant"
            style={{ display: "block", float: "none", clear: "both" }}
          >
            {Name}
          </div>
          <div className="information-restaurant__address-restaurant">
            {FullAddress}
          </div>
          <div className="information-restaurant__vote-and-review-restaurant">
            <Rating rate={data.Rating} />
            <div className="information-restaurant__review-restaurant">
              <div className="information-restaurant__count-review">
                {data.TotalReviews + 4 + "+ lượt đánh giá"}
              </div>
              <div
                style={{ cursor: "pointer", color: "#0044CC" }}
                onClick={() => setOpenDialogReivew(true)}
              >
                <i>
                  <u>Xem chi tiết</u>
                </i>
              </div>
            </div>
          </div>
          <div className="information-restaurant__time-open-restaurant">
            <span>Mở cửa:</span> {OpenHours[0] + " - " + OpenHours[1]}
          </div>
          <div className="information-restaurant__price-restaurant">
            {/* <span>Thông báo:</span> {Anouncement} */}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default InformationRestaurant;
