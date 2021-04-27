import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import ItemFood from "./ItemFood";
import ItemMenu from "./ItemMenu";
import "./styles.css";
import DialogCheckout from "../DialogCheckout";
import { useDispatch, useSelector } from "react-redux";
import cartAction from "../../../storage/action/cartAction";

const ListFood = () => {
  const cart = useSelector((state) => state.cart);
  const data = cart.infoRestaurant.listFood;

  const [currentCategory, setCurrentCategory] = useState("all");
  const [listFoodFilter, setListFoodFilter] = useState(data);
  const [openDialogCheckout, setOpenDialogCheckout] = useState(false);

  const dispatch = useDispatch();
  const listOrder = cart.listOrder;

  const setListOrder = (newListOrder) => {
    dispatch(cartAction.updateCart(newListOrder));
  };

  useEffect(() => {
    if (currentCategory === "all") {
      setListFoodFilter(data);
      return;
    }

    setListFoodFilter(data.filter((item) => item.value === currentCategory));
  }, [currentCategory]);

  const addToCart = (_id) => {
    const listFoodTemp = data.reduce((arrayFood, currCategory) => {
      return arrayFood.concat(currCategory.listFood);
    }, []);

    const indexFood = listFoodTemp.map((item) => item._id).indexOf(_id);
    if (indexFood <= -1) return;

    const indexFoodInCart = listOrder.map((item) => item._id).indexOf(_id);
    if (indexFoodInCart <= -1) {
      setListOrder(
        listOrder.concat({ ...listFoodTemp[indexFood], quantity: 1, note: "" })
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
    <>
      <DialogCheckout
        open={openDialogCheckout}
        onClose={() => setOpenDialogCheckout(false)}
      />
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
          {data.map((category) => (
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
          <Cart
            listOrder={listOrder}
            changeQuantity={changeQuantity}
            callbackCheckout={() => setOpenDialogCheckout(true)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ListFood;
