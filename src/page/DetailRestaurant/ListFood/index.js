import { Grid } from "@material-ui/core";
import React, { useState } from "react";
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

  return (
    <Grid className="list-food__container" item container xs={12}>
      <Grid className="list-food__category" item xs={3}>
        {listCategory.map((category) => (
          <div
            className={[
              "list-food__category-item",
              `${
                currentCategory === category.value
                  ? "list-food__category-item-active"
                  : ""
              }`,
            ].join(" ")}
          >
            {category.title}
          </div>
        ))}
      </Grid>
      <Grid className="list-food__list-food" item xs={5}>
        FOOD
      </Grid>
      <Grid className="list-food__cart" item xs={4}>
        CART
      </Grid>
    </Grid>
  );
};

export default ListFood;
