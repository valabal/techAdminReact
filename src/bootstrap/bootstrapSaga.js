import { all } from "redux-saga/effects";
import loginSaga from "module/login/loginSaga";

function* bootstrapSagas() {
  yield all([...loginSaga]);
}

export default bootstrapSagas;
