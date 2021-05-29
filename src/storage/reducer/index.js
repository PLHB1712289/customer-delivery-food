import { combineReducers } from "redux";
import tokenReducer from "./service/token";
import loadingReducer from "./service/loading";
import profileReducer from "./service/profile";
import cityReducer from "./service/city";
import indexProfileReducer from "./service/indexProfile";
import searchReducer from "./service/search";
import addressDeliveryReducer from "./service/addressDelivery";
import cartReducer from "./service/cart";

const reducer = combineReducers({
  cart: cartReducer,
  addressDelivery: addressDeliveryReducer,
  token: tokenReducer,
  loading: loadingReducer,
  profile: profileReducer,
  city: cityReducer,
  indexProfile: indexProfileReducer,
  search: searchReducer
});

export default reducer;
