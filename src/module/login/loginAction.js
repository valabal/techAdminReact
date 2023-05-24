import * as CONST from "./loginConstant";

export const requestLogin = (payload) => ({
  type: CONST.LOGIN_REQ,
  payload,
});

export const requestLoginSuccess = (payload) => ({
  type: CONST.LOGIN_SUCCESS,
  payload,
});

export const requestLoginFailed = (payload) => ({
  type: CONST.LOGIN_FAILED,
  payload,
});

export const requestRegister = (payload) => ({
  type: CONST.REGISTER_REQ,
  payload,
});

export const requestRegisterSuccess = (payload) => ({
  type: CONST.REGISTER_SUCCESS,
  payload,
});

export const requestRegisterFailed = (payload) => ({
  type: CONST.REGISTER_FAILED,
  payload,
});
