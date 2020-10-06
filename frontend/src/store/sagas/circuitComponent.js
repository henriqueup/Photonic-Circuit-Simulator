import { takeEvery, call } from "redux-saga/effects";
import api from "../../api";

export function* helloSaga() {
  console.log("Sagas working!");
}

function* createCircuitComponentSaga() {
  //call api
  const healthCheck = yield call(api.healthCheck);
  console.log(healthCheck);

  const post = yield call(api.postComponent);
  console.log(post);
}

export function* watchCreateCircuitComponent() {
  yield takeEvery("circuitComponent/CREATE", createCircuitComponentSaga);
}
