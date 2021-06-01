import React, { useEffect, useState } from "react";
import ItemFood from "../ItemFood";

const ListItemFood = (listFood) => {
    listFood = [1,2,3,4,4,4,44,4];
  const data = listFood.map((food, index) => (
    <ItemFood
      key={index}
      Avatar={"food.Avatar"}
      Name={"food.Name"}
      OriginalPrice={"food.OriginalPrice"}
      id={"food.i"}
      addToCart={"addToCart"}
      data={"food"}
    ></ItemFood>
  ));

  return <>{data}</>;
};

export default ListItemFood;
