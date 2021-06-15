import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Rating from "../Rating";
import apiService from "./apiService";
import "./styles.css";

const RestaurantItem = ({ restaurant }) => {
  const history = useHistory();

  const onViewDetailRestaurant = () => {
    history.push("restaurant/" + restaurant._id);
  };

  return (
    <div style={{ display: "flex", float: "left" }} onClick={onViewDetailRestaurant}>
      <img src={restaurant.Avatar} width="80px" height="49px"></img>
      <div style={{ marginLeft: "10px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            marginBottom: "0.7vh",
          }}
        >
          {restaurant.Name}
        </div>
        <Rating rate={4}></Rating>
      </div>
    </div>
  );
};

export default RestaurantItem;
