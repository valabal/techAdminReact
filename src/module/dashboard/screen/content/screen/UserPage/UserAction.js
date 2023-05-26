import * as CONST from "./UserScreenConstant";

export const requestLoadUser = (payload) => ({
  type: CONST.GET_USER_REQ,
  payload,
});

export const requestLoadUserSuccess = (payload) => ({
  type: CONST.GET_USER_SUCCESS,
  payload,
});

export const requestLoadUserFailed = (payload) => ({
  type: CONST.GET_USER_FAILED,
  payload,
});

export const deleteUsers = (payload) => ({
  type: CONST.USER_DELETED,
  payload,
});

export const addUsers = (payload) => ({
  type: CONST.USER_ADD,
  payload,
});

export const editUsers = (payload) => ({
  type: CONST.USER_CHANGED,
  payload,
});
