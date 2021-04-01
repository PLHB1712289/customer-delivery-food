import React from "react";
import "./styles.css";

const CardVoucher = ({ urlImg, nameVoucher }) => {
  return (
    <div className="card-voucher__container">
      <div className="card-voucher__custom">
        <img
          src="https://images.foody.vn/delivery/collection/s320x200/image-777fd4da-210331223934.jpeg"
          alt="image"
        />
        <h2 className="card-voucher__title">Siêu deal 9k</h2>
        <p className="card-voucher__address">200 địa điểm</p>
      </div>
    </div>
  );
};

export default CardVoucher;
