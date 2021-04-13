import { Grid } from "@material-ui/core";
import React from "react";
import Rating from "./Rating";
import "./styles.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const InformationRestaurant = () => {
  return (
    <Grid
      item
      container
      xs={12}
      spacing={2}
      className="information-restaurant__container"
    >
      <Grid item xs={5}>
        <img
          className="information-restaurant__thumbnail"
          alt=""
          src="https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg"
        />
      </Grid>
      <Grid item xs={7}>
        <div className="information-restaurant__location">
          TP.HCM {">>"} Bún Thịt nướng chú ba
        </div>
        <div className="information-restaurant__like">
          <ThumbUpAltIcon style={{ width: 20, marginRight: 5 }} />
          Yêu thích
        </div>
        <div className="information-restaurant__name-restaurant">
          Bún thịt nướng chú ba
        </div>
        <div className="information-restaurant__address-restaurant">
          126 Lê Văn Sỹ, P.10, Quận Phú Nhuận, TP.HCM
        </div>
        <div className="information-restaurant__vote-and-review-restaurant">
          <Rating rate={1} />
          <div className="information-restaurant__review-restaurant">
            <div className="information-restaurant__count-review">100+</div>
            lượt đánh giá
          </div>
        </div>
        <div className="information-restaurant__time-open-restaurant">
          <span>Mở cửa:</span> 09:00-21:00
        </div>
        <div className="information-restaurant__price-restaurant">
          <span>Giá tiền:</span> 30.000-200.000 VNĐ
        </div>
      </Grid>
    </Grid>
  );
};

export default InformationRestaurant;
