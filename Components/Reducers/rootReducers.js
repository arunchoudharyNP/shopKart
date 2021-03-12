import AuthReducer from "../../Store/Reducers/auth";
import { combineReducers } from "redux";
import Product from "../../Store/Reducers/Product";

const reducers = combineReducers({
  AuthReducer: AuthReducer,
  ProductReducer: Product,
});

export default reducers;
