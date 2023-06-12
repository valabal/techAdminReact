import { loginReducer } from "./loginReducers";
import * as CONST from "./loginConstant";
import * as STATE from "./loginState";

describe("loginReducer", () => {
  const initialState = {
    ...STATE.getLoginInitialState,
    ...STATE.getRegisterInitialState,
  };

  it("should handle LOGIN_SUCCESS", () => {
    const action = {
      type: CONST.LOGIN_SUCCESS,
      payload: {
        data: {
          token: "some-token",
        },
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState.token).toBe("some-token");
    expect(newState.isLogin).toBe(true);
  });

  it("should handle REGISTER_SUCCESS", () => {
    const action = {
      type: CONST.REGISTER_SUCCESS,
      payload: {
        data: {
          token: "some-token",
        },
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState.token).toBe("some-token");
    expect(newState.isLogin).toBe(true);
  });

  it("should handle LOGIN_RESET", () => {
    const action = {
      type: CONST.LOGIN_RESET,
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should return the initial state for unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
