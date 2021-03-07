

import AuthReducer from "../../Store/Reducers/auth";
import { combineReducers} from "redux";


const reducers = combineReducers({
    AuthReducer: AuthReducer,
  });



  export default reducers