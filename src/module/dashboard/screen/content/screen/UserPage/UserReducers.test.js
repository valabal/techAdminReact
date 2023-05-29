import { usersReducer } from "./UserReducers";
import { initialState } from "./UserState";
import * as ACTION from "./UserAction";
describe("usersReducer", () => {
  it("should handle GET_USER_REQ action", () => {
    const action = ACTION.requestLoadUser(1);
    const newState = usersReducer(initialState, action);
    console.log(newState);
    expect(newState.getUserFetchStatus).toBe(true);
    expect(newState.getUserError).toBe(null);
    expect(newState.page).toBe(1);
  });

  it("should handle GET_USER_SUCCESS action", () => {
    const state = {
      getUserFetchStatus: true,
      users: [],
      page: 1,
    };
    const action = ACTION.requestLoadUserSuccess([{ id: 1, name: "John" }]);
    const newState = usersReducer(state, action);

    expect(newState.getUserFetchStatus).toBe(false);
    expect(newState.users).toEqual([{ id: 1, name: "John" }]);
    expect(newState.page).toBe(2);
  });

  it("should handle GET_USER_FAILED action", () => {
    const state = {
      getUserFetchStatus: true,
    };
    const action = ACTION.requestLoadUserFailed("Error message");
    const newState = usersReducer(state, action);

    expect(newState.getUserFetchStatus).toBe(false);
    expect(newState.getUserError).toBe("Error message");
  });

  it("should handle USER_DELETED action", () => {
    const state = {
      users: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ],
    };
    const action = ACTION.deleteUsers({ id: 1 });
    const newState = usersReducer(state, action);

    expect(newState.users).toEqual([{ id: 2, name: "Jane" }]);
  });

  it("should handle USER_ADD action", () => {
    const state = {
      users: [{ id: 1, name: "John" }],
    };
    const action = ACTION.addUsers({ id: 2, name: "Jane" });
    const newState = usersReducer(state, action);

    expect(newState.users).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ]);
  });

  it("should handle USER_CHANGED action", () => {
    const state = {
      users: [{ id: 1, name: "John" }],
    };

    const action = ACTION.editUsers({ id: 1, name: "Jane" });
    const newState = usersReducer(state, action);

    expect(newState.users).toEqual([{ id: 1, name: "Jane" }]);
  });
});
