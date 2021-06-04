import React, { useEffect, useState } from "react";
import ItemFood from "../ItemFood";

const ListItemFood = (props) => {
  const { foods } = props;
  var listFood = foods ? foods : [];
  
  const data = listFood.map((food, index) => (
    <ItemFood
      key={index}
      Avatar={food.Avatar}
      Name={food.Name}
      data={food}
    ></ItemFood>
  ));

  return <>{data}</>;
};

export default ListItemFood;
