import { takeLatest, put, call } from "redux-saga/effects";
import { getUsers } from "./UserScreenApi";
import {
  requestLoadUser,
  requestLoadUserSuccess,
  requestLoadUserFailed,
} from "./UserAction";

import * as CONST from "./UserScreenConstant";

function* loadUsers({ payload }) {
  console.log("TES LOAD USERS");
  try {
    const response = yield call(getUsers, payload);
    console.log("output users");
    const users = response.data?.data ?? [];
    yield put(requestLoadUserSuccess(users));
  } catch (error) {
    console.log(error);
    yield put(requestLoadUserFailed("User List not Found"));
  }
}

export default [takeLatest(CONST.GET_USER_REQ, loadUsers)];
