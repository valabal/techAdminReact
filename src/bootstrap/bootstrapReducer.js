import { combineReducers } from "redux";
import { loginReducer } from "module/login/loginReducers";
import { usersReducer } from "module/dashboard/screen/content/screen/UserPage/UserReducers";

const bootstrapReducers = combineReducers({ loginReducer, usersReducer });

export default bootstrapReducers;
