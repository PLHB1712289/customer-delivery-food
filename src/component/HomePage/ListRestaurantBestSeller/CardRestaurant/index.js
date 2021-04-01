import labelPercent from "@iconify/icons-mdi/label-percent";
import { Icon } from "@iconify/react";
import React from "react";
import "./styles.css";
import StrUtils from "../../../../utils/StrUtils";

const CardRestaurant = ({
  urlImg,
  nameRestaurant,
  addressRestaurant,
  voucher,
}) => {
  return (
    <div
      className="card-restaurant__container"
      onClick={() => {
        alert("Restaurant say hello");
      }}
    >
      <div className="card-restaurant__custom">
        <div className="card-restaurant__thumbnail">
          <div className="status"></div>
          <img src={urlImg} alt="image" />
        </div>

        <div className="card-restaurant__info-container">
          <div className="card-restaurant__info">
            <div className="card-restaurant__title">
              {StrUtils.formatNameRestaurantCard(nameRestaurant)}
            </div>
            <div className="card-restaurant__address">
              {StrUtils.formatAddressRestaurantCard(addressRestaurant)}
            </div>
          </div>
          <div className="card-restaurant__voucher">
            <Icon
              icon={labelPercent}
              style={{ color: "#ff0000", fontSize: "30px", margin: "0 5px" }}
            />
            {voucher}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRestaurant;
