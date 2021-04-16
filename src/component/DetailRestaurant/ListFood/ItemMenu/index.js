import React, { useRef } from "react";

const ItemMenu = ({ currentCategory, category, onClick }) => {
  return (
    <div
      className={[
        "list-food__category-item",
        `${
          currentCategory === category.value
            ? "list-food__category-item-active"
            : ""
        }`,
      ].join(" ")}
      onClick={onClick}
    >
      {category.lable}
    </div>
  );
};

export default ItemMenu;
