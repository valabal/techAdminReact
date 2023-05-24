import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import createSagaMiddleware from "redux-saga";
import bootstrapReducers from "bootstrap/bootstrapReducer";

let finalReducers = bootstrapReducers;

const composeEnhancer = compose;

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  finalReducers,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

let sagaRunner;

export const runSaga = (rootSaga) => {
  if (sagaRunner) {
    sagaRunner.cancel();
  }
  sagaRunner = sagaMiddleware.run(rootSaga);
};
