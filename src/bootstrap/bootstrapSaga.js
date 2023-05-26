import { all } from "redux-saga/effects";
import loginSaga from "module/login/loginSaga";
import userSaga from "module/dashboard/screen/content/screen/UserPage/UserSaga";

function* bootstrapSagas() {
  yield all([...loginSaga, ...userSaga]);
}

export default bootstrapSagas;
