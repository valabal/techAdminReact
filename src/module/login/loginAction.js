import * as CONST from "./loginConstant";

export const requestLoginSuccess = (payload) => ({
  type: CONST.LOGIN_SUCCESS,
  payload,
});

export const requestRegisterSuccess = (payload) => ({
  type: CONST.REGISTER_SUCCESS,
  payload,
});

export const loginReset = () => ({
  type: CONST.LOGIN_RESET,
});
