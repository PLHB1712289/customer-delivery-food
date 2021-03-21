import { combineReducers } from "redux";
import tokenReducer from "./service/token";
import loadingReducer from "./service/loading";


const reducer = combineReducers({
    token: tokenReducer,
    loading: loadingReducer
});

export default reducer;
