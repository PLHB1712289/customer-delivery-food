import React from "react";
import "./styles.css";
import StrUtils from "../../../utils/StrUtils";

const ItemFood = ({ Avatar, Name, data }) => {
  var price = data.Price;
  var describe = "";
  for (var i = 0; i < data.Options.length; i++) {
    var option = data.Options[i];
    for (var j = 0; j < option.Items.length; j++) {
      var item = option.Items[j];
      price += item.Price;
      describe += item.Name + ", ";
    }
  }

  if (describe.length > 2) {
    describe = describe.substr(0, describe.length - 2);
  }

  return (
    <>
      <div className="dialog-order-item-food__container">
        <div className="dialog-order-item-food__food">
          <div className="dialog-order-item-food__thumbnail">
            <img
              className="dialog-order-item-food__avatar"
              src={Avatar}
              alt=""
            />
          </div>
          <div className="dialog-order-item-food__info">
            <div className="dialog-order-item-food__info-name">{Name}</div>
            <div className="dialog-order-item-food__info-option">
              {describe}
            </div>
            <div className="dialog-order-item-food__info-amount">
              Số lượng: {data.Quantity}
            </div>
            <div className="dialog-order-item-food__info-price">
              {StrUtils.formatMoneyString(price)}đ
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemFood;
