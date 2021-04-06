import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// UI component
import {} from "@material-ui/core";

// UI icon
import { LocalOffer, VerifiedUser } from "@material-ui/icons";

// UI custom
import SpanLike from "../../Common/SpanLike";

// Utils
import StrUtils from "../../../utils/StrUtils";

// action
import action from "../../../storage/action";
// import apiService from "./apiService";

// config
import Localization from "../../../config/Localization";

import "./styles.css";

const Card = (props) => {
  const { data } = props;
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  let classReddot = "listRes_reddot ";
  let statusText = "";
  if (data.isOpening === 0) {
    classReddot += "listRes_green";
    statusText = Localization.text("txt_open");
  }
  else if (data.isOpening === 1) {
    classReddot += "listRes_yellow";
    statusText = Localization.text("txt_closed_soon");
  }
  else {
    classReddot += "listRes_red";
    statusText = Localization.text("txt_closed");
  }

  return (
    <>
      <div className="listRes_card-custom">
        <div className={classReddot}>{statusText}</div>
        <img
          src={data.urlImg}
          alt="image"
        ></img>
        <div className="listRes_span-like">
          <SpanLike />
        </div>
        <div>
          <VerifiedUser className="listRes_vertify-icon" />
          <h3 className="listRes_title">{StrUtils.formatNameRestaurantCart(data.nameRestaurant)}</h3>
        </div>
        <p className="listRes_address">{StrUtils.formatAdressRestaurantCart(data.addressRestaurant)}</p>
        <hr className="listRes_break-line-card"></hr>
        <LocalOffer className="listRes_icon-offer" />
        <div className="listRes_text-offer">{data.voucher}</div>
      </div>
    </>
  );
};

export default Card;
