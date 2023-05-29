import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import * as ACTION from "./loginAction";
import * as API from "./loginApi";
import { RESPONSE_STATUS } from "util/constant";
import * as SAGA from "./loginSaga";
import { throwError } from "redux-saga-test-plan/providers";

describe("registerReq saga", () => {
  it("should handle REGISTER_REQUEST success", () => {
    const payload = { username: "testuser", password: "password" };
    const response = { status: RESPONSE_STATUS.SUCCESS };

    return expectSaga(SAGA.registerReq, { payload })
      .provide([[call(API.register, payload), response]])
      .put(ACTION.requestRegisterSuccess(response))
      .dispatch(ACTION.requestRegister(payload))
      .run();
  });
  it("should handle REGISTER_REQUEST bad request", () => {
    const payload = { username: "testuser", password: "password" };
    const response = { status: RESPONSE_STATUS.ERROR };

    return expectSaga(SAGA.registerReq, { payload })
      .provide([[call(API.register, payload), response]])
      .put(
        ACTION.requestRegisterFailed({
          error: "There something wrong in the server please try again",
        })
      )
      .dispatch(ACTION.requestRegister(payload))
      .run();
  });
  it("REGISTER_REQUEST handles errors", () => {
    const error = new Error("error");

    const payload = { username: "testuser", password: "password" };
    const response = { status: RESPONSE_STATUS.ERROR };

    return expectSaga(SAGA.registerReq, { payload })
      .provide([[call(API.register, payload), response, throwError(error)]])
      .put(
        ACTION.requestRegisterFailed({
          error: "There something wrong in the server please try again",
        })
      )
      .dispatch(ACTION.requestRegister(payload))
      .run();
  });

  it("should handle LOGIN_REQUEST success", () => {
    const payload = { username: "testuser", password: "password" };
    const response = { status: RESPONSE_STATUS.SUCCESS };

    return expectSaga(SAGA.loginSaga, { payload })
      .provide([[call(API.loginUser, payload), response]])
      .put(ACTION.requestLoginSuccess(response))
      .dispatch(ACTION.requestLogin(payload))
      .run();
  });

  it("should handle LOGIN_REQUEST failure with error response", () => {
    const payload = { username: "testuser", password: "password" };
    const error = { response: { status: RESPONSE_STATUS.ERROR } };

    return expectSaga(SAGA.loginSaga, { payload })
      .provide([[call(API.loginUser, payload), throwError(error)]])
      .put(
        ACTION.requestLoginFailed({ error: "Username or Password not match" })
      )
      .dispatch(ACTION.requestLogin(payload))
      .run();
  });

  it("should handle LOGIN_REQUEST failure with other error", () => {
    const payload = { username: "testuser", password: "password" };
    const error = new Error("Server error");

    return expectSaga(SAGA.loginSaga, { payload })
      .provide([[call(API.loginUser, payload), throwError(error)]])
      .put(
        ACTION.requestLoginFailed({
          error: "There something wrong in the server please try again",
        })
      )
      .dispatch(ACTION.requestLogin(payload))
      .run();
  });
});
