import React from "react";
import "./styles.css";

const ItemFood = ({ thumbnail, name, price }) => {
  return (
    <div className="detail-restaurant-item-food__container">
      <div className="detail-restaurant-item-food__food">
        <div className="detail-restaurant-item-food__thumbnail">
          <img
            src="https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg"
            alt=""
          />
        </div>
        <div className="detail-restaurant-item-food__info">
          <div className="detail-restaurant-item-food__info-name">Bún</div>
          <div className="detail-restaurant-item-food__info-price">30,000đ</div>
        </div>
      </div>
      <div className="detail-restaurant-item-food__add-to-cart">+</div>
    </div>
  );
};

export default ItemFood;
