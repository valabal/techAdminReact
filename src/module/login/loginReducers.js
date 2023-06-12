import * as CONST from "./loginConstant";
import * as STATE from "./loginState";

const initialState = {
  ...STATE.getLoginInitialState,
  ...STATE.getRegisterInitialState,
};

export const loginReducer = (state = initialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.LOGIN_SUCCESS]: () => {
      const token = payload.data.token;
      const username = payload.username;
      return {
        ...state,
        token: token,
        isLogin: true,
        userName: username,
      };
    },
    [CONST.REGISTER_SUCCESS]: () => {
      const token = payload.data.token;
      const username = payload.username;
      return {
        ...state,
        token: token,
        isLogin: true,
        userName: username,
      };
    },
    [CONST.LOGIN_RESET]: () => {
      return initialState;
    },
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
