import labelPercent from "@iconify/icons-mdi/label-percent";
import { Icon } from "@iconify/react";
import React from "react";
import "./styles.css";
import StrUtils from "../../../../utils/StrUtils";
import { useHistory } from "react-router-dom";
import Rating from "../Rating";

const CardRestaurant = ({
  id,
  isOpen,
  urlImg,
  nameRestaurant,
  addressRestaurant,
  voucher,
  rating
}) => {
  const history = useHistory();

  return (
    <div
      className="card-restaurant__container"
      onClick={() => {
        history.push(`/restaurant/${id}`);
      }}
    >
      <div className="card-restaurant__custom">
        <div className="card-restaurant__thumbnail">
          {isOpen ? <div className="status" style={{backgroundColor: "green"}}>Đang mở</div> :  <div className="status">Đóng cửa</div>}
          <img src={urlImg} alt="image" />
        </div>

        <div className="card-restaurant__info-container">
          <div className="card-restaurant__info">
            <div className="card-restaurant__title">
              {StrUtils.formatNameRestaurantCart(nameRestaurant)}
            </div>
            <div className="card-restaurant__address">
              {StrUtils.formatAddressRestaurantCard(addressRestaurant)}
            </div>
          </div>
          <div className="card-restaurant__voucher">
            <Rating rate={rating}></Rating>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRestaurant;
