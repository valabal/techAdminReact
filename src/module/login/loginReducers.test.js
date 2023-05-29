import { loginReducer } from "./loginReducers";
import * as CONST from "./loginConstant";
import * as STATE from "./loginState";

describe("loginReducer", () => {
  const initialState = {
    ...STATE.getLoginInitialState,
    ...STATE.getRegisterInitialState,
  };

  it("should handle LOGIN_REQ", () => {
    const action = {
      type: CONST.LOGIN_REQ,
    };
    const newState = loginReducer(initialState, action);
    expect(newState.getLoginFetchStatus).toBe(true);
    expect(newState.token).toBeNull();
    expect(newState.isLogin).toBe(false);
    expect(newState.getLoginError).toBeNull();
  });

  it("should handle LOGIN_SUCCESS", () => {
    const action = {
      type: CONST.LOGIN_SUCCESS,
      payload: {
        token: "some-token",
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState.getLoginFetchStatus).toBe(false);
    expect(newState.token).toBe("some-token");
    expect(newState.isLogin).toBe(true);
    expect(newState.getLoginError).toBeNull();
  });

  it("should handle LOGIN_FAILED", () => {
    const action = {
      type: CONST.LOGIN_FAILED,
      payload: {
        error: "Invalid credentials",
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState.getLoginFetchStatus).toBe(false);
    expect(newState.token).toBeNull();
    expect(newState.isLogin).toBe(false);
    expect(newState.getLoginError).toBe("Invalid credentials");
  });

  it("should handle REGISTER_REQ", () => {
    const action = {
      type: CONST.REGISTER_REQ,
    };
    const newState = loginReducer(initialState, action);
    expect(newState.getRegisterFetchStatus).toBe(true);
    expect(newState.token).toBeNull();
    expect(newState.isLogin).toBe(false);
    expect(newState.getRegisterError).toBeNull();
  });

  it("should handle REGISTER_SUCCESS", () => {
    const action = {
      type: CONST.REGISTER_SUCCESS,
      payload: {
        token: "some-token",
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState.getRegisterFetchStatus).toBe(false);
    expect(newState.token).toBe("some-token");
    expect(newState.isLogin).toBe(true);
    expect(newState.getRegisterError).toBeNull();
  });

  it("should handle REGISTER_FAILED", () => {
    const action = {
      type: CONST.REGISTER_FAILED,
      payload: {
        error: "Registration failed",
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState.getRegisterFetchStatus).toBe(false);
    expect(newState.token).toBeNull();
    expect(newState.isLogin).toBe(false);
    expect(newState.getRegisterError).toBe("Registration failed");
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
