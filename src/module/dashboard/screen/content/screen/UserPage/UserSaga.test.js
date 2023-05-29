import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import * as ACTION from "./UserAction";
import * as API from "./UserScreenApi";
import { RESPONSE_STATUS } from "util/constant";
import * as SAGA from "./UserSaga";
import { throwError } from "redux-saga-test-plan/providers";

describe("UserScreen saga", () => {
  it("should handle GET USER success", () => {
    const payload = 1;
    const userSample = [1, 2, 3];
    const response = {
      status: RESPONSE_STATUS.SUCCESS,
      data: { data: userSample },
    };

    return expectSaga(SAGA.loadUsers, { payload })
      .provide([[call(API.getUsers, payload), response]])
      .put(ACTION.requestLoadUserSuccess(userSample))
      .dispatch(ACTION.requestLoadUser(payload))
      .run();
  });

  it("GET USER handles errors", () => {
    const error = new Error("error");
    const payload = 1;
    return expectSaga(SAGA.loadUsers, { payload })
      .provide([[call(API.getUsers, payload), throwError(error)]])
      .put(ACTION.requestLoadUserFailed("User List not Found"))
      .dispatch(ACTION.requestLoadUser(payload))
      .run();
  });
});
