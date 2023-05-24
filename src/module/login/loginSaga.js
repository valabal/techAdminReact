import { takeLatest, put, call } from "redux-saga/effects";
import { RESPONSE_STATUS } from "util/constant";
import { LOGIN_REQ, REGISTER_REQ } from "./loginConstant";
import * as ACTION from "./loginAction";
import * as API from "./loginApi";

/*
function* networkError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    yield put(setErrorMessage(error.message));
  } else {
    console.log('unexpected error: ', error);
    yield put(setErrorMessage('UNKNOWN ERROR'));
  }
}
*/

function* registerReq({ payload }) {
  try {
    const response = yield call(API.register, payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(ACTION.requestRegisterSuccess(response));
        break;

      default:
    }
  } catch (error) {
    const { response: data } = error;
    yield put(
      ACTION.requestRegisterFailed({
        error:
          data.data?.error ??
          "There something wrong in the server please try again",
      })
    );
  }
}

function* loginSaga({ payload }) {
  try {
    const response = yield call(API.loginUser, payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(ACTION.requestLoginSuccess(response));
        break;
      default:
        yield put(
          ACTION.requestLoginFailed({
            error: "There something wrong in the server  try again",
          })
        );
    }
  } catch (error) {
    console.log("ERROR" + error);
    const statusCode = error.response?.status;
    switch (statusCode) {
      case RESPONSE_STATUS.ERROR:
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(
          ACTION.requestLoginFailed({ error: "Username or Password not match" })
        );
        break;
      default:
        yield put(
          ACTION.requestLoginFailed({
            error: "There something wrong in the server please try again",
          })
        );
    }
  }
}

export default [
  takeLatest(LOGIN_REQ, loginSaga),
  takeLatest(REGISTER_REQ, registerReq),
];
