import TAG from "../TAG";
const action = {};

action.updateCart = (listOrder) => ({
  type: TAG.CART.UPDATE_CART,
  payload: { listOrder },
});

action.createCart = (infoRestaurant) => ({
  type: TAG.CART.LOAD_FROM_LOCAL_STORAGE,
  payload: { infoRestaurant },
});

action.saveCart = () => ({
  type: TAG.CART.SAVE_CART_INTO_LOCAL_STORAGE,
});

export default action;
