import { takeEvery, call } from "redux-saga/effects";
import API from "../../api";

export function* helloSaga() {
  console.log("Sagas working!");
}

function* createCircuitComponentSaga() {
  //call api
  const healthCheck = yield call(API.healthCheck);
  console.log(healthCheck);

  const post = yield call(API.postComponent);
  console.log(post);
}

export function* watchCreateCircuitComponent() {
  yield takeEvery("circuitComponent/CREATE", createCircuitComponentSaga);
}
