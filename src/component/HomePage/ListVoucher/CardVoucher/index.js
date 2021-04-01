import React from "react";
import "./styles.css";
import StrUtils from "../../../../utils/StrUtils";

const CardVoucher = ({ urlImg, nameVoucher, quantityApply }) => {
  return (
    <div className="card-voucher__container">
      <div className="card-voucher__custom">
        <img src={urlImg} alt="image" />
        <div className="card-voucher__title" style={{ fontFamily: "inherit" }}>
          {StrUtils.formatNameVoucherCard(nameVoucher)}
        </div>
        <div
          className="card-voucher__address"
          style={{ fontFamily: "inherit" }}
        >
          {quantityApply} địa điểm
        </div>
      </div>
    </div>
  );
};

export default CardVoucher;
