import { combineReducers } from "redux";
import tokenReducer from "./service/token";
import loadingReducer from "./service/loading";
import profileReducer from "./service/profile";

const reducer = combineReducers({
  token: tokenReducer,
  loading: loadingReducer,
  profile: profileReducer
});

export default reducer;
