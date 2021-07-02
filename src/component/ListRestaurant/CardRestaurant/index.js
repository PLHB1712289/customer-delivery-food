import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// UI component
import {} from "@material-ui/core";

// UI icon
import { LocalOffer, VerifiedUser } from "@material-ui/icons";
// UI custom
import SpanLike from "../../Common/SpanLike";
import Rating from "../Rating";
// Utils
import StrUtils from "../../../utils/StrUtils";
import ImgUtils from "../../../utils/ImageUtils";

// config
import Localization from "../../../config/Localization";

import "./styles.css";
import ImageUtils from "../../../utils/ImageUtils";

const Card = (props) => {
  const { data } = props;
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  let classReddot = "listRes_reddot ";
  let statusText = "";
  if (data.IsOpening) {
    classReddot += "listRes_green";
    statusText = Localization.text("txt_open");
  }
  // else if (data.isOpening === 1) {
  //   classReddot += "listRes_yellow";
  //   statusText = Localization.text("txt_closed_soon");
  // }
  else {
    classReddot += "listRes_red";
    statusText = Localization.text("txt_closed");
  }

  const onViewDetailRestaurant = () => {
    history.push("restaurant/" + data.id);
  };

  return (
    <>
      <div className="listRes_card-custom" onClick={onViewDetailRestaurant}>
        <div className={classReddot}>{statusText}</div>
        <img
          src={
            data.Avatar !== null
              ? data.Avatar
              : "https://images.foody.vn/res/g4/37576/prof/s750x400/foody-mobile-hmb-f-jpg-811-635780121292133127.jpg"
          }
          alt="image"
        ></img>
        <div className="listRes_span-like">{/* <SpanLike /> */}</div>
        <div>
          {data.IsPartner ? (
            <VerifiedUser className="listRes_vertify-icon" />
          ) : (
            <></>
          )}
          <h3 className="listRes_title">{data.Name}</h3>
        </div>
        <p className="listRes_address">{data.FullAddress}</p>
        <div style={{ marginLeft: "8px" }}>
          <Rating rate={data.Rating}></Rating>
        </div>
        {/* <LocalOffer className="listRes_icon-offer" /> */}
        <div className="listRes_text-offer">{data.voucher}</div>
      </div>
    </>
  );
};

export default Card;
