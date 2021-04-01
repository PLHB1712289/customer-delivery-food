import React from "react";
import "./styles.css";
import { Icon } from "@iconify/react";
import labelAlt from "@iconify/icons-uil/label-alt";
import coinsLine from "@iconify/icons-ri/coins-line";
import labelPercent from "@iconify/icons-mdi/label-percent";
import shieldIcon from "@iconify/icons-entypo/shield";

const RestaurantItem = () => {
  return (
    <div className="restaurant-item">
      <div className="restaurant-item__thumbnail">
        <img
          alt=""
          src="https://images.foody.vn/res/g32/316391/prof/s280x175/image-5d32b8ba-200908105705.jpeg"
        />
      </div>
      <div className="restaurant-item__information">
        <div className="restaurant-item__name-restaurant">
          <Icon
            icon={shieldIcon}
            style={{ color: "#ffc107", fontSize: "20px" }}
          />
          Bích Phong - Gỏi cuốn
        </div>
        <div className="restaurant-item__address-restaurant">
          58 Lê Thị Hồng, P.17, Gò Vấp, TP.HCM
        </div>
        <div className="restaurant-item__quick-info-restaurant">
          <div className="restaurant-item__min-price-restaurant">
            <Icon
              icon={labelAlt}
              style={{ color: "#ffc107", fontSize: "20px" }}
            />
            Tối thiểu 20k
          </div>
          <div className="restaurant-item__price-restaurant">
            <Icon
              icon={coinsLine}
              style={{ color: "#ffc107", fontSize: "20px" }}
            />
            Giá 40k
          </div>
        </div>
        <div className="restaurant-item__deal-restaurant">
          <Icon
            icon={labelPercent}
            style={{ color: "#ff0000", fontSize: "20px" }}
          />
          Giảm món
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
