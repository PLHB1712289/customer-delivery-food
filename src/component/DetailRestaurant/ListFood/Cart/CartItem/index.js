import React from "react";
import "./styles.css";

import StrUtils from "../../../../../utils/StrUtils";
const displayPrice = StrUtils.formatMoneyString;

const CartItem = ({
  id,
  name,
  quantity,
  price,
  options,
  note,
  changeQuantity,
  Avatar,
}) => {
  const increaseQuantity = () => changeQuantity(id, quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) changeQuantity(id, quantity - 1);
  };

  var strOptions = "";
  var totalPrice = price;
  for (var i = 0; i < options.length; i++) {
    for (var j = 0; j < options[i].Items.length; j++) {
      if (options[i].Items[j].IsDefault) {
        totalPrice += options[i].Items[j].OriginalPrice;
        strOptions += options[i].Items[j].Name + ", ";
      }
    }
  }

  return (
    <div className="detail-restaurant__cart-item-container">
      <div className="detail-restaurant__cart-item-row">
        <div className="detail-restaurant__cart-item-quantity-container">
          <img
            width="30px"
            height="30px"
            style={{ marginRight: "10px" }}
            src={Avatar}
            alt=""
          ></img>
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

        <div className="detail-restaurant__cart-item-name">{name}&nbsp;</div>
        <div className="detail-restaurant__cart-item-option">{strOptions !== "" ? " (" + strOptions + ")" : ""}</div>
      </div>

      <div className="detail-restaurant__cart-item-row-note-container">
        <input
          className="detail-restaurant__cart-item-note"
          placeholder="Thêm ghi chú..."
        >
          {note}
        </input>
        <div className="detail-restaurant__cart-item-price">
          {displayPrice(totalPrice * quantity)}đ
        </div>
      </div>
    </div>
  );
};

export default CartItem;
