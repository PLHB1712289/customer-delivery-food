import React from "react";
import "./styles.css";

import StrUtils from "../../../../../utils/StrUtils";
const displayPrice = StrUtils.formatMoneyString;

const CartItem = ({ id, name, quantity, price, note, changeQuantity }) => {
  const increaseQuantity = () => changeQuantity(id, quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) changeQuantity(id, quantity - 1);
  };

  return (
    <div className="detail-restaurant__cart-item-container">
      <div className="detail-restaurant__cart-item-row">
        <div className="detail-restaurant__cart-item-quantity-container">
          <button
            className="detail-restaurant__button-decrease-quantity"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <div className="detail-restaurant__cart-item-quantity">
            {quantity}
          </div>
          <button
            className="detail-restaurant__button-increase-quantity"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>

        <div className="detail-restaurant__cart-item-name">{name}</div>
      </div>

      <div className="detail-restaurant__cart-item-row-note-container">
        <input
          className="detail-restaurant__cart-item-note"
          placeholder="Thêm ghi chú..."
        >
          {note}
        </input>
        <div className="detail-restaurant__cart-item-price">
          {displayPrice(price * quantity)}đ
        </div>
      </div>
    </div>
  );
};

export default CartItem;
