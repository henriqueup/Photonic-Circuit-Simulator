import { takeEvery, call, put } from "redux-saga/effects";
import api from "../../api";
import { createWithID, setCurrent } from "../ducks/circuit";

function* createCircuitSaga() {
  const post = yield call(api.postCircuit);
  console.log(post);

  yield put(createWithID(post.id));
  yield put(setCurrent(post.id));
}

export function* watchCreateCircuit() {
  yield takeEvery("circuit/CREATE", createCircuitSaga);
}

function* saveCircuitSaga() {
  yield call(api.saveCircuit);
}

export function* watchSaveCircuit() {
  yield takeEvery("circuit/SAVE", saveCircuitSaga);
}
