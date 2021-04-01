import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import labelPercent from "@iconify/icons-mdi/label-percent";
import "./styles.css";

const CardRestaurant = ({ urlImg, nameRestaurant, address, voucher }) => {
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
          <img
            src="https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg"
            alt="image"
          />
        </div>

        <div className="card-restaurant__info-container">
          <div className="card-restaurant__info">
            <div className="card-restaurant__title">Quán Bún Dì Vân</div>
            <div className="card-restaurant__address">Địa chỉ nè</div>
          </div>
          <div className="card-restaurant__voucher">
            <Icon
              icon={labelPercent}
              style={{ color: "#ff0000", fontSize: "30px", margin: "0 5px" }}
            />
            Giảm hết 10%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRestaurant;
