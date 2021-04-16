import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import ItemFood from "./ItemFood";
import ItemMenu from "./ItemMenu";
import "./styles.css";

// const defaultListCategory = [
//   {
//     title: "Món 1",
//     value: "category1",
//   },
//   {
//     title: "Món 2",
//     value: "category2",
//   },
// ];

const ListFood = () => {
  const [listFood, setListFood] = useState([
    {
      lable: "Cơm",
      value: "rice",
      listFood: [
        {
          _id: "123",
          thumbnail:
            "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
          name: "Bún bò viên",
          price: 45000,
        },
        {
          _id: "124",
          thumbnail:
            "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
          name: "Bún bò tái",
          price: 45000,
        },
        {
          _id: "125",
          thumbnail:
            "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
          name: "Phở tái nạm",
          price: 45000,
        },
      ],
    },
    {
      lable: "Món thêm",
      value: "subfood",
      listFood: [
        {
          _id: "126",
          thumbnail:
            "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
          name: "Bún thêm",
          price: 10000,
        },
        {
          _id: "127",
          thumbnail:
            "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
          name: "Bánh thêm",
          price: 10000,
        },
      ],
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [listOrder, setListOrder] = useState([]);
  const [listFoodFilter, setListFoodFilter] = useState(listFood);

  useEffect(() => {
    if (currentCategory === "all") {
      setListFoodFilter(listFood);
      return;
    }

    setListFoodFilter(
      listFood.filter((item) => item.value === currentCategory)
    );
  }, [currentCategory]);

  const addToCart = (_id) => {
    const listFoodTemp = listFood.reduce((arrayFood, currCategory) => {
      return arrayFood.concat(currCategory.listFood);
    }, []);

    const indexFood = listFoodTemp.map((item) => item._id).indexOf(_id);
    if (indexFood <= -1) return;

    const indexFoodInCart = listOrder.map((item) => item._id).indexOf(_id);
    if (indexFoodInCart <= -1) {
      setListOrder(
        listOrder.concat({ ...listFoodTemp[indexFood], quantity: 1 })
      );
    } else {
      changeQuantity(_id, listOrder[indexFoodInCart].quantity + 1);
    }
  };

  const changeQuantity = (id, quantity) => {
    const indexItemOrder = listOrder.map((item) => item._id).indexOf(id);
    if (indexItemOrder <= -1) return;

    const newListOrder = listOrder.slice();
    newListOrder[indexItemOrder].quantity = quantity;

    setListOrder(newListOrder);
  };

  return (
    <Grid className="list-food__container" item container xs={12}>
      <Grid className="list-food__category" item xs={3}>
        <span>THỰC ĐƠN</span>
        <ItemMenu
          category={{ value: "all", lable: "Tất cả" }}
          currentCategory={currentCategory}
          onClick={() => {
            setCurrentCategory("all");
          }}
        />
        {listFood.map((category) => (
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

        {listFoodFilter.map((item, index) => {
          return (
            <div className="list-food__lable-category" key={index}>
              <span>
                {item.lable}({item.listFood.length})
              </span>
              {item.listFood.map((food) => (
                <ItemFood
                  thumbnail={food.thumbnail}
                  name={food.name}
                  price={food.price}
                  id={food._id}
                  addToCart={addToCart}
                />
              ))}
            </div>
          );
        })}
      </Grid>

      <Grid className="list-food__cart" item xs={4}>
        <Cart listOrder={listOrder} changeQuantity={changeQuantity} />
      </Grid>
    </Grid>
  );
};

export default ListFood;
