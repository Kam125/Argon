import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer  = combineReducers({
    authUser:authReducer
})

export default rootReducer;