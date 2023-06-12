import { all } from "redux-saga/effects";
import userSaga from "module/dashboard/screen/content/screen/UserPage/UserSaga";

function* bootstrapSagas() {
  yield all([...userSaga]);
}

export default bootstrapSagas;
