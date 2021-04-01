import React from "react";
import "./styles.css";

const CardRestaurant = () => {
  return (
    <div className="card-container">
      <div className="card-custom">
        <div className="status"></div>
        <img
          className="image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
          alt="image"
        ></img>
        <h2 className="title">Quán Bún Dì Vân</h2>
        <p className="address">Địa chỉ nè</p>
        <div className="card-voucher"></div>
      </div>
    </div>
  );
};

export default CardRestaurant;
