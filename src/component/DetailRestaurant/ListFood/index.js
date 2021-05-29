import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import ItemFood from "./ItemFood";
import ItemMenu from "./ItemMenu";
import "./styles.css";
import DialogCheckout from "../DialogCheckout";
import { useDispatch, useSelector } from "react-redux";
import cartAction from "../../../storage/action/cartAction";
import apiService from "./apiService";
import ListItemFood from "./ListItemFood";
import { Filter } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const ListFood = () => {
  const cart = useSelector((state) => state.cart);
  const data = [];

  const [currentCategory, setCurrentCategory] = useState("all");
  const [listFoodFilter, setListFoodFilter] = useState(data);
  const [openDialogCheckout, setOpenDialogCheckout] = useState(false);
  const [listFood, setListFood] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const listOrder = cart.listOrder;

  const setListOrder = (newListOrder) => {
    dispatch(cartAction.updateCart(newListOrder));
  };

  useEffect(() => {
    // if (currentCategory === "all") {
    //   setListFoodFilter(data);
    //   return;
    // }

    // setListFoodFilter(data.filter((item) => item.value === currentCategory));

    (async () => {
      try {
        const { errorCode, data } = await apiService.getRestaurantCategories(
          cart.infoRestaurant.id
        );

        if (errorCode === 0) {
          setListFoodFilter(data);
        }
      } catch (e) {}
    })();
  }, [currentCategory]);

  const addToCart = (_id) => {
    const indexFood = listFood.map((item) => item.id).indexOf(_id);
    if (indexFood <= -1) return;

    const indexFoodInCart = listOrder.map((item) => item.id).indexOf(_id);
    if (indexFoodInCart <= -1) {
      setListOrder(
        listOrder.concat({ ...listFood[indexFood], quantity: 1, note: "" })
      );
    } else {
      changeQuantity(_id, listOrder[indexFoodInCart].quantity + 1);
    }
  };

  const changeQuantity = (id, quantity) => {
    const indexItemOrder = listOrder.map((item) => item.id).indexOf(id);
    if (indexItemOrder <= -1) return;

    const newListOrder = listOrder.slice();
    newListOrder[indexItemOrder].quantity = quantity;

    setListOrder(newListOrder);
  };

  const addFood = (foods) => {
    setListFood((prev) => prev.concat(foods));
  };

  const onChangeOption = (event, foodId, optionId, itemId, type) => {
    console.log(event.target.checked);
    console.log("foodId: " + foodId);
    console.log("optionId: " + optionId);
    console.log("itemId: " + itemId);
    console.log("type: " + type);

        // set list food
    const listFood_indexItemOrder = listFood.map((item) => item.id).indexOf(foodId);
    if (listFood_indexItemOrder <= -1) return;
    const newListFood = listFood.slice();
    const listFood_indexOption = newListFood[listFood_indexItemOrder].Options.map((item) => item.id).indexOf(optionId);
    if (listFood_indexOption <= -1) return;
    const listFood_indexItem = newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items.map((item) => item.id).indexOf(itemId);
    if (listFood_indexItem <= -1) return;
    if (type === "radio") {
        for (var i = 0; i < newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items.length; i++) {
          newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[i].IsDefault = false;
          newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[i].Quantity = 1;
        }
        newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[listFood_indexItem].IsDefault = true;
        newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[listFood_indexItem].Quantity = 1;
     }
    else {
      newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[listFood_indexItem].IsDefault = event.target.checked;
      newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[listFood_indexItem].Quantity = 1;
    }
    setListFood(newListFood);

    // set in cart
    const indexItemOrder = listOrder.map((item) => item.id).indexOf(foodId);
    if (indexItemOrder <= -1) return;
    const newListOrder = listOrder.slice();
    const indexOption = newListOrder[indexItemOrder].Options.map((item) => item.id).indexOf(optionId);
    if (indexOption <= -1) return;
    const indexItem = newListOrder[indexItemOrder].Options[indexOption].Items.map((item) => item.id).indexOf(itemId);
    if (indexItem <= -1) return;
    if (type === "radio") {
        for (var i = 0; i < newListOrder[indexItemOrder].Options[indexOption].Items.length; i++) {
          newListOrder[indexItemOrder].Options[indexOption].Items[i].IsDefault = false;
          newListOrder[indexItemOrder].Options[indexOption].Items[i].Quantity = 1;
        }
        newListOrder[indexItemOrder].Options[indexOption].Items[indexItem].IsDefault = true;
        newListOrder[indexItemOrder].Options[indexOption].Items[indexItem].Quantity = 1;
    }
    else {
      newListOrder[indexItemOrder].Options[indexOption].Items[indexItem].IsDefault = event.target.checked;
      newListOrder[indexItemOrder].Options[indexOption].Items[indexItem].Quantity = 1;
    }
    setListOrder(newListOrder);
};


  const foods = currentCategory === "all" ? listFoodFilter : listFoodFilter.filter((item) => item.id === currentCategory);

  return (
    <>
      <DialogCheckout
        open={openDialogCheckout}
        onClose={() => setOpenDialogCheckout(false)}
        renderSignInPage={() => { history.push("sign-in") }}
      />
      <Grid className="list-food__container" item container xs={12}>
        <Grid className="list-food__category" item xs={3}>
          <span>THỰC ĐƠN</span>
          <ItemMenu
            category={{ id: "all", Name: "Tất cả" }}
            currentCategory={currentCategory}
            onClick={() => {
              setCurrentCategory("all");
            }}
          />
          {listFoodFilter.map((category) => (
            <ItemMenu
              category={category}
              currentCategory={currentCategory}
              onClick={() => {
                setCurrentCategory(category.id);
              }}
            />
          ))}
        </Grid>
        <Grid className="list-food__list-food" item xs={5}>
          <span>DANH SÁCH MÓN ĂN</span>

          {foods.map((item, index) => {
            return (
              <div className="list-food__lable-category" key={index}>
                <span style={{ fontWeight: "bold", lineHeight: "5" }}>
                  {item.Name}
                </span>
                <ListItemFood
                  addFood={addFood}
                  restaurantId={cart.infoRestaurant.id}
                  categoryId={item.id}
                  addToCart={addToCart}
                  onChangeOption={onChangeOption}
                />
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
