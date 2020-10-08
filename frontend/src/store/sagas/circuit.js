import { takeEvery, call, put } from "redux-saga/effects";
import api from "../../api";
import { createWithID, save, setCurrent } from "../ducks/circuit";

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
  const response = yield call(api.saveCircuit);

  const text = yield response.text();
  if (response.ok) {
    yield put(save());
  } else {
    alert(text);
  }
}

export function* watchSaveCircuit() {
  yield takeEvery("circuit/ATTEMPT_SAVE", saveCircuitSaga);
}
