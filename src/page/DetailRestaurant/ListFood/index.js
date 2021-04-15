import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Cart from "./Cart";
import ItemFood from "./ItemFood";
import ItemMenu from "./ItemMenu";
import "./styles.css";

const defaultListCategory = [
  {
    title: "Món 1",
    value: "category1",
  },
  {
    title: "Món 2",
    value: "category2",
  },
];

const ListFood = () => {
  const [listCategory, setListCategory] = useState(defaultListCategory);
  const [currentCategory, setCurrentCategory] = useState(listCategory[0].value);

  const [listFood, setListFood] = useState([
    {
      lable: "Cơm",
      listFood: [
        { thumbnail: "", name: "", price: "" },
        { thumbnail: "", name: "", price: "" },
        { thumbnail: "", name: "", price: "" },
      ],
    },
    { lable: "Món thêm", listFood: [{ thumbnail: "", name: "", price: "" }] },
  ]);

  return (
    <Grid className="list-food__container" item container xs={12}>
      <Grid className="list-food__category" item xs={3}>
        <span>THỰC ĐƠN</span>
        {listCategory.map((category) => (
          <ItemMenu
            category={category}
            currentCategory={currentCategory}
            onClick={() => {
              setCurrentCategory(category.value);
            }}
          />
        ))}
      </Grid>
      <Grid className="list-food__list-food" item xs={5}>
        <span>DANH SÁCH MÓN ĂN</span>

        {listFood.map((item, index) => {
          return (
            <div className="list-food__lable-category" key={index}>
              <span>{item.lable}</span>
              {item.listFood.map((food) => (
                <ItemFood />
              ))}
            </div>
          );
        })}
      </Grid>

      <Grid className="list-food__cart" item xs={4}>
        <Cart />
      </Grid>
    </Grid>
  );
};

export default ListFood;
