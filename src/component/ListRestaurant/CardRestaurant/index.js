import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {} from "@material-ui/core";
import { LocalOffer, VerifiedUser } from "@material-ui/icons";

import SpanLike from "../../Common/SpanLike";

import ImageUtils from "../../../utils/ImageUtils";
import DataUtils from "../../../utils/DataUtils";
import StrUtils from "../../../utils/StrUtils";

import action from "../../../storage/action";
// import apiService from "./apiService";
import Localization from "../../../config/Localization";

import "./styles.css";

const Card = (props) => {
  const { data } = props;
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  return (
    <>
      <div className="card-custom">
        <div className="reddot green"></div>
        <img
          className="image"
          src={data.Avatar}
          alt="image"
        ></img>
        <div className="span-like">
          <SpanLike />
        </div>
        <div>
          <VerifiedUser className="vertify-icon" />
          <h3 className="title">{data.Name}</h3>
        </div>
        <p className="address">{StrUtils.formatAdressRestaurantCart(data.Address)}</p>
        <hr className="break-line-card"></hr>
        <LocalOffer className="icon-offer" />
        <div className="text-offer">Giảm 50%</div>
      </div>
    </>
  );
};

export default Card;
