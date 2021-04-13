import { combineReducers } from "redux";
import tokenReducer from "./service/token";
import loadingReducer from "./service/loading";
import profileReducer from "./service/profile";
import cityReducer from "./service/city";
import indexProfileReducer from "./service/indexProfile";

const reducer = combineReducers({
  token: tokenReducer,
  loading: loadingReducer,
  profile: profileReducer,
  city: cityReducer,
  indexProfile: indexProfileReducer
});

export default reducer;
