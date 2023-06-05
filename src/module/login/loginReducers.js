import * as CONST from "./loginConstant";
import * as STATE from "./loginState";

const initialState = {
  ...STATE.getLoginInitialState,
  ...STATE.getRegisterInitialState,
};

export const loginReducer = (state = initialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.LOGIN_REQ]: () => ({
      ...state,
      getLoginFetchStatus: true,
      token: null,
      isLogin: false,
      getLoginError: null,
      userName: payload.email,
    }),
    [CONST.LOGIN_SUCCESS]: () => {
      const token = payload.data.token;
      return {
        ...state,
        getLoginFetchStatus: false,
        token: token,
        isLogin: true,
        getLoginError: null,
      };
    },
    [CONST.LOGIN_FAILED]: () => {
      return {
        ...state,
        getLoginFetchStatus: false,
        token: null,
        isLogin: false,
        getLoginError: payload.error,
      };
    },
    [CONST.REGISTER_REQ]: () => ({
      ...state,
      getRegisterFetchStatus: true,
      token: null,
      isLogin: false,
      getRegisterError: null,
      userName: payload.email,
    }),
    [CONST.REGISTER_SUCCESS]: () => {
      const token = payload.token;
      return {
        ...state,
        getRegisterFetchStatus: false,
        token: token,
        isLogin: true,
        getRegisterError: null,
      };
    },
    [CONST.REGISTER_FAILED]: () => {
      return {
        ...state,
        getRegisterFetchStatus: false,
        token: null,
        isLogin: false,
        getRegisterError: payload.error,
      };
    },
    [CONST.LOGIN_RESET]: () => {
      return initialState;
    },
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
