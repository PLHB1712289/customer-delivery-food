import React from "react";
import "./styles.css";
import StrUtils from "../../../utils/StrUtils";

const ItemFood = ({ Avatar, Name, OriginalPrice, _id, data }) => {
  return (
    <>
    <div className="dialog-order-item-food__container">
      <div className="dialog-order-item-food__food">
        <div className="dialog-order-item-food__thumbnail">
          <img className="dialog-order-item-food__avatar" src="https://images.foody.vn/res/g11/100592/prof/s750x400/foody-upload-api-foody-mobile-9-200116144432.jpg" alt="" />
        </div>
        <div className="dialog-order-item-food__info">
          <div className="dialog-order-item-food__info-name">{"Trà sữa TocoToco"}</div>
          <div className="dialog-order-item-food__info-option">Size lớn, 100% đường, 100% đá, Size lớn, 100% đường, 100% đá</div>
          <div className="dialog-order-item-food__info-amount">Số lượng: 3</div>
          <div className="dialog-order-item-food__info-price">{StrUtils.formatMoneyString(30000)}đ</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ItemFood;
