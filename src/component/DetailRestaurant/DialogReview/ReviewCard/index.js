import React, { useState, useEffect } from "react";
import Rating from "../Rating";
import "./styles.css";

export default function ReviewCard({ data }) {
  return (
    <>
      <div className="review-card__container">
        <div className="review-card__thumbnail">
          <img src={data.User.Avatar} />
        </div>
        <div className="review-card__info">
          <div className="review-card__info-name">{data.User.FullName}</div>
          <div className="review-card__info-comment">{data.Content}</div>
          <div className="review-card_subInfo">
            <div><Rating rate={data.Point}></Rating></div>
            <div className="review-card__info-time">
              {new Date(data.CreatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
