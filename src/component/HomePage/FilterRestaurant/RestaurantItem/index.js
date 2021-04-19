import React from "react";
import "./styles.css";
import { Icon } from "@iconify/react";
import labelAlt from "@iconify/icons-uil/label-alt";
import coinsLine from "@iconify/icons-ri/coins-line";
import labelPercent from "@iconify/icons-mdi/label-percent";
import shieldIcon from "@iconify/icons-entypo/shield";
import { useHistory } from "react-router-dom";

const RestaurantItem = ({
  id,
  urlImg,
  nameRestaurant,
  addressRestaurant,
  minPrice,
  avgPrice,
  voucher,
}) => {
  const history = useHistory();

  return (
    <div
      className="restaurant-item"
      onClick={() => history.push(`/restaurant/${id}`)}
    >
      <div className="restaurant-item__thumbnail">
        <img alt="" src={urlImg} />
      </div>
      <div className="restaurant-item__information">
        <div className="restaurant-item__name-restaurant">
          <Icon
            icon={shieldIcon}
            style={{ color: "#ffc107", fontSize: "20px" }}
          />
          {nameRestaurant}
        </div>
        <div className="restaurant-item__address-restaurant">
          {addressRestaurant}
        </div>
        <div className="restaurant-item__quick-info-restaurant">
          <div className="restaurant-item__min-price-restaurant">
            <Icon
              icon={labelAlt}
              style={{ color: "#ffc107", fontSize: "20px" }}
            />
            Tối thiểu {minPrice}k
          </div>
          <div className="restaurant-item__price-restaurant">
            <Icon
              icon={coinsLine}
              style={{ color: "#ffc107", fontSize: "20px" }}
            />
            Giá {avgPrice}k
          </div>
        </div>
        <div className="restaurant-item__deal-restaurant">
          <Icon
            icon={labelPercent}
            style={{ color: "#ff0000", fontSize: "20px" }}
          />
          {voucher}
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
