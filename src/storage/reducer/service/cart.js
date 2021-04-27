import TAG from "../../TAG";

// Default value of cart
const INITIAL_STATE = {
  infoRestaurant: {
    id: null,
    thumbnail: "",
    location: "",
    name: "",
    address: "",
    totalRating: "",
    rating: 0,
    timeOpenRestaurant: "",
    priceAvg: "",
    listFood: [],
  },
  listOrder: [],
  note: "",
};

// <UTIL>
// Load cart from local storage when user access detail restaurant page
const loadCartFromLocalStorage = (infoRestaurant) => {
  console.log(infoRestaurant);
  const cart = localStorage.getItem(`cart_${infoRestaurant.id}`);

  if (!cart) return { ...INITIAL_STATE, infoRestaurant };

  return JSON.parse(cart);
};

// Save cart into local storage when user exits restaurant page and cart exist
const saveCartIntoLocalStorage = (cart) => {
  if (cart.listOrder.length === 0) {
    // remove cart if it exists
    removeCartInLocalStorage(cart.infoRestaurant.id);
    return;
  }

  const key = `cart_${cart.infoRestaurant.id}`;
  localStorage.setItem(key, JSON.stringify(cart));
};

// Remove cart in local storage when user confirm order.
const removeCartInLocalStorage = (id) => {
  const key = `cart_${id}`;
  localStorage.removeItem(key);
};

const cartReducer = (cart = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.CART.LOAD_FROM_LOCAL_STORAGE:
      return loadCartFromLocalStorage(action.payload.infoRestaurant);

    case TAG.CART.SAVE_CART_INTO_LOCAL_STORAGE:
      saveCartIntoLocalStorage(cart);
      return cart;

    case TAG.CART.UPDATE_CART:
      const listOrder = action.payload.listOrder.filter((order) =>
        order.quantity !== 0 ? order : null
      );
      const note = listOrder.reduce((note, currentNote) => {
        if (currentNote.note.length === 0) return note;

        note +=
          note.length === 0 ? `${currentNote.note}` : `\n${currentNote.note}`;
        return note;
      }, "");

      const newCart = JSON.parse(JSON.stringify({ ...cart, listOrder, note }));

      saveCartIntoLocalStorage(newCart);
      return newCart;

    default:
      return cart;
  }
};
export default cartReducer;
