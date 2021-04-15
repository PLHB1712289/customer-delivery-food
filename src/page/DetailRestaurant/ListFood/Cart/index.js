import React, { useState } from "react";
import "./styles.css";
import AvatarUserDefault from "../../../../assets/img/user-default.png";
import CartItem from "./CartItem";

const displayPrice = (price) => {
  var re = "\\d(?=(\\d{" + 3 + "})+" + "$" + ")";
  return price.toFixed(Math.max(0, 0)).replace(new RegExp(re, "g"), "$&,");
};

const Cart = () => {
  const [listOrder, setListOrder] = useState([
    { _id: "12345", name: "Phở tái chanh", quantity: 1, price: "65000" },
    { _id: "12346", name: "Phở bò viên", quantity: 1, price: "65000" },
  ]);

  const changeQuantity = (id, quantity) => {
    const indexItemOrder = listOrder.map((item) => item._id).indexOf(id);
    if (indexItemOrder <= -1) return;

    const newListOrder = listOrder.slice();
    newListOrder[indexItemOrder].quantity = quantity;

    setListOrder(newListOrder);
  };

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
      <button className="detail-restaurant__cart-submit-order">Đặt hàng</button>
    </div>
  );
};

export default Cart;
