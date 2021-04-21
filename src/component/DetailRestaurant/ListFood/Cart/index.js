import React, { useState } from "react";
import "./styles.css";
import AvatarUserDefault from "../../../../assets/img/user-default.png";
import CartItem from "./CartItem";

import StrUtils from "../../../../utils/StrUtils";
const displayPrice = StrUtils.formatMoneyString;

const Cart = ({ listOrder, changeQuantity, callbackCheckout }) => {
  const totalPrice = listOrder.reduce((sum, currOrder) => {
    sum += currOrder.quantity * currOrder.price;
    return sum;
  }, 0);

  return (
    <div className="detail-restaurant__cart-container">
      <span className="detail-restaurant__cart-title">Giỏ hàng</span>
      <div className="detail-restaurant__cart-user">
        <div className="detail-restaurant__cart-user-avatar">
          <img src={AvatarUserDefault} alt="" />
          <div className="detail-restaurant__cart-user-name">foodee_agsas</div>
        </div>

        <div className="detail-restaurant__cart-total-item">4 món</div>
      </div>
      <div className="detail-restaurant__cart-list-order">
        {listOrder.map((order) => {
          return (
            order.quantity > 0 && (
              <CartItem
                key={order._id}
                id={order._id}
                name={order.name}
                quantity={order.quantity}
                price={order.price}
                changeQuantity={changeQuantity}
              />
            )
          );
        })}
      </div>
      <div className="detail-restaurant__cart-total">
        <div className="detail-restaurant__cart-total-title">Tổng cộng</div>
        <div className="detail-restaurant__cart-total-money">
          {displayPrice(totalPrice)}đ
        </div>
      </div>
      <button
        className="detail-restaurant__cart-submit-order"
        onClick={() => {
          if (listOrder.length) callbackCheckout();
        }}
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default Cart;
