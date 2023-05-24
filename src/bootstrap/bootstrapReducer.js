import { combineReducers } from "redux";
import { loginReducer } from "module/login/loginReducers";

const bootstrapReducers = combineReducers({ loginReducer });

export default bootstrapReducers;
