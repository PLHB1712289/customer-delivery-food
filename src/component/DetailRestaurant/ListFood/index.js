import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import ItemMenu from "./ItemMenu";
import "./styles.css";
import DialogCheckout from "../DialogCheckout";
import DialogOption from "../DialogOption";
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
  const [openDialogOption, setOpenDialogoption] = useState(false);
  const [listFood, setListFood] = useState([]);
  const [currFood, setCurrFood] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const listOrder = cart.listOrder;

  let { token } = useSelector((state) => state.token);
  if (token === null) {
    token = localStorage.getItem("token");
  }

  const setListOrder = (newListOrder) => {
    dispatch(cartAction.updateCart(newListOrder));
  };

  const onCheckOrder = () => {
    if (!token) {
      localStorage.setItem("cachePath", window.location.pathname);
      history.push("/sign-in");
      return;
    }
    setOpenDialogCheckout(true);
  };

  useEffect(() => {
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

  const addToCart = (_id, foodData, quantity) => {
    // add food by food data
    if (_id === null) {
      quantity = quantity || 0;
      var flagSame = true;
      var food = null;
      var index = -1;
      var id = -1;
      for (var k = 0; k < listOrder.length; k++) {
        food = listOrder[k];
        index = k;
        id = food.id;
        if (food.id !== foodData.id) continue;
        for (var i = 0; i < food.Options.length; i++) {
          const option_1 = food.Options[i];
          const option_2 = foodData.Options[i];
          for (var j = 0; j < option_1.Items.length; j++) {
            var item_1 = option_1.Items[j].IsDefault;
            var item_2 = option_2.Items[j].IsDefault;
            if (item_1 !== item_2) {
              flagSame = false;
              break;
            }
          }
          if (!flagSame) break;
        }
      }

      if (flagSame && id === foodData.id) {
        if (index > -1)
          changeQuantity(index, listOrder[index].quantity + quantity);
        else
          setListOrder(
            listOrder.concat({ ...foodData, quantity: quantity, note: "" })
          );
      } else {
        setListOrder(
          listOrder.concat({ ...foodData, quantity: quantity, note: "" })
        );
      }
      return;
    }

    // add food by id
    const indexFood = listFood.map((item) => item.id).indexOf(_id);
    if (indexFood <= -1) return;
    const indexFoodInCart = listOrder.map((item) => item.id).indexOf(_id);
    if (indexFoodInCart <= -1) {
      setListOrder(
        listOrder.concat({ ...listFood[indexFood], quantity: 1, note: "" })
      );
    } else {
      // check is same option
      var flagSame = true;
      for (var i = 0; i < listOrder[indexFoodInCart].Options.length; i++) {
        const option_1 = listOrder[indexFoodInCart].Options[i];
        const option_2 = listFood[indexFood].Options[i];
        for (var j = 0; j < option_1.Items.length; j++) {
          var item_1 = option_1.Items[j].IsDefault;
          var item_2 = option_2.Items[j].IsDefault;
          if (item_1 !== item_2) {
            flagSame = false;
            break;
          }
        }
        if (!flagSame) break;
      }
      if (flagSame) {
        changeQuantity(
          indexFoodInCart,
          listOrder[indexFoodInCart].quantity + 1
        );
      } else {
        setListOrder(
          listOrder.concat({ ...listFood[indexFood], quantity: 1, note: "" })
        );
      }
    }
  };

  const changeQuantity = (indexFoodInCart, quantity) => {
    if (indexFoodInCart < 0 || indexFoodInCart > listOrder.length - 1) return;

    const newListOrder = listOrder.slice();
    newListOrder[indexFoodInCart].quantity = quantity;

    setListOrder(newListOrder);
  };

  const addFood = (foods) => {
    setListFood((prev) => prev.concat(foods));
  };

  // const onChangeOption = (event, foodId, optionId, itemId, type) => {
  //   // set list food
  //   const listFood_indexItemOrder = listFood
  //     .map((item) => item.id)
  //     .indexOf(foodId);
  //   if (listFood_indexItemOrder <= -1) return;
  //   const newListFood = listFood.slice();
  //   const listFood_indexOption = newListFood[
  //     listFood_indexItemOrder
  //   ].Options.map((item) => item.id).indexOf(optionId);
  //   if (listFood_indexOption <= -1) return;
  //   const listFood_indexItem = newListFood[listFood_indexItemOrder].Options[
  //     listFood_indexOption
  //   ].Items.map((item) => item.id).indexOf(itemId);
  //   if (listFood_indexItem <= -1) return;
  //   if (type === "radio") {
  //     for (
  //       var i = 0;
  //       i <
  //       newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items
  //         .length;
  //       i++
  //     ) {
  //       newListFood[listFood_indexItemOrder].Options[
  //         listFood_indexOption
  //       ].Items[i].IsDefault = false;
  //       newListFood[listFood_indexItemOrder].Options[
  //         listFood_indexOption
  //       ].Items[i].Quantity = 1;
  //     }
  //     newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[
  //       listFood_indexItem
  //     ].IsDefault = true;
  //     newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[
  //       listFood_indexItem
  //     ].Quantity = 1;
  //   } else {
  //     newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[
  //       listFood_indexItem
  //     ].IsDefault = event.target.checked;
  //     newListFood[listFood_indexItemOrder].Options[listFood_indexOption].Items[
  //       listFood_indexItem
  //     ].Quantity = 1;
  //   }
  //   setListFood(newListFood);
  // };

  const onChooseOption = (food) => {
    setCurrFood(food);
    setOpenDialogoption(true);
  };

  const foods =
    currentCategory === "all"
      ? listFoodFilter
      : listFoodFilter.filter((item) => item.id === currentCategory);

  return (
    <>
      <DialogCheckout
        open={openDialogCheckout}
        onClose={() => setOpenDialogCheckout(false)}
        renderSignInPage={() => {
          history.push("sign-in");
        }}
      />
      <DialogOption
        open={openDialogOption}
        onClose={() => setOpenDialogoption(false)}
        data={currFood}
        addToCart={addToCart}
        renderSignInPage={() => {
          history.push("sign-in");
        }}
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
          {listFoodFilter.map((category, index) => (
            <ItemMenu
              key={index}
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
                  onChooseOption={onChooseOption}
                />
              </div>
            );
          })}
        </Grid>

        <Grid className="list-food__cart" item xs={4}>
          <Cart
            listOrder={listOrder}
            changeQuantity={changeQuantity}
            callbackCheckout={() => onCheckOrder()}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ListFood;
