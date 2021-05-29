import React, { useState } from "react";
import "./styles.css";
import AvatarUserDefault from "../../../../assets/img/user-default.png";
import CartItem from "./CartItem";
import StrUtils from "../../../../utils/StrUtils";
import { useSelector } from "react-redux";

const displayPrice = StrUtils.formatMoneyString;

const Cart = ({ listOrder, changeQuantity, callbackCheckout }) => {
  const totalPrice = listOrder.reduce((sum, currOrder) => {
    sum += currOrder.quantity * currOrder.OriginalPrice;
    return sum;
  }, 0);

  // use local storage
  let { token } = useSelector((state) => state.token);
  let { userID, fullName, avatarUrl } = useSelector((state) => state.profile);
  // use redux
  if (token === null) {
    token = localStorage.getItem("token");
    userID = localStorage.getItem("userID");
    avatarUrl = localStorage.getItem("avatar");
    fullName = localStorage.getItem("fullName");
  }

  const Avatar = token === null ? AvatarUserDefault : avatarUrl;
  const Fullname = token === null ? "" : fullName;

  return (
    <div className="detail-restaurant__cart-container">
      <span className="detail-restaurant__cart-title">Giỏ hàng</span>
      <div className="detail-restaurant__cart-user">
        <div className="detail-restaurant__cart-user-avatar">
          <img src={Avatar} alt="" />
          <div className="detail-restaurant__cart-user-name">{Fullname}</div>
        </div>

        <div className="detail-restaurant__cart-total-item">
          {listOrder.length + " món"}
        </div>
      </div>
      <div className="detail-restaurant__cart-list-order">
        {listOrder.map((order) => {
          return (
            order.quantity > 0 && (
              <CartItem
                key={order.id}
                id={order.id}
                name={order.Name}
                quantity={order.quantity}
                price={order.OriginalPrice}
                options={order.Options}
                Avatar={order.Avatar}
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
