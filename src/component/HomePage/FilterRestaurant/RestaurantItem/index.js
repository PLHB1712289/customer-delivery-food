import React from "react";
import "./styles.css";
import { Icon } from "@iconify/react";
import labelAlt from "@iconify/icons-uil/label-alt";
import coinsLine from "@iconify/icons-ri/coins-line";
import open from "@iconify/icons-ri/open-source-line"
import close from "@iconify/icons-ri/close-circle-line";
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
  isPartner,
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
          {isPartner ? (
            <Icon
              icon={shieldIcon}
              style={{ color: "#ffc107", fontSize: "20px" }}
            />
          ) : (
            <></>
          )}
          {nameRestaurant}
        </div>
        <div className="restaurant-item__address-restaurant">
          {addressRestaurant}
        </div>
        <div className="restaurant-item__quick-info-restaurant">
          <div className="restaurant-item__min-price-restaurant">
            <Icon
              icon={open}
              style={{ color: "green", fontSize: "20px", marginRight: "4px"  }}
            />
            Mở cửa {minPrice}
          </div>
          <div className="restaurant-item__price-restaurant">
      
          </div>
        </div>
        <div className="restaurant-item__deal-restaurant">
        <Icon
              icon={close}
              style={{ color: "red", fontSize: "20px", marginRight: "4px" }}
            />
            {"Đóng cửa"} {avgPrice}
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
