import React from "react";
import "./styles.css";

const ItemFood = ({ thumbnail, name, price, id, addToCart }) => {
  return (
    <div className="detail-restaurant-item-food__container">
      <div className="detail-restaurant-item-food__food">
        <div className="detail-restaurant-item-food__thumbnail">
          <img src={thumbnail} alt="" />
        </div>
        <div className="detail-restaurant-item-food__info">
          <div className="detail-restaurant-item-food__info-name">{name}</div>
          <div className="detail-restaurant-item-food__info-price">{price}</div>
        </div>
      </div>
      <button
        className="detail-restaurant-item-food__add-to-cart"
        onClick={() => addToCart(id)}
      >
        +
      </button>
    </div>
  );
};

export default ItemFood;
