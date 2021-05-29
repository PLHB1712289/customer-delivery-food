import React, { useEffect, useState } from "react";
import ItemFood from "../ItemFood";
import apiService from "./apiService";

const ListItemFood = ({ restaurantId, categoryId, addToCart, addFood, onChangeOption }) => {
  const [listFood, setListFood] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { errorCode, data } = await apiService.getRestaurantCategoryFood(
          restaurantId,
          categoryId
        );

        if (errorCode === 0) {
          setListFood(data);
          addFood(data);
        }
      } catch (e) {}
    })();
  }, [categoryId]);

  const data = listFood.map((food, index) => (
    <ItemFood
      key={index}
      Avatar={food.Avatar}
      Name={food.Name}
      OriginalPrice={food.OriginalPrice}
      _id={food.id}
      addToCart={addToCart}
      data={food}
      onChangeOption={onChangeOption}
    ></ItemFood>
  ));

  return <>{data}</>;
};

export default ListItemFood;
