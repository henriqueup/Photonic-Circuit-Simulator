import { takeEvery, call, put, all } from "redux-saga/effects";
import api from "../../api";
import { createWithID, save, setCurrent } from "../ducks/circuit";
import { store } from "..";
import { calculateOutputs, setOutputsUpToDate } from "../ducks/circuitComponent";

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

function* simulateSaga() {
  const switchKinds = ["swn", "swp"];
  const switches = store.getState().circuitComponent.instances.filter((instance) => switchKinds.includes(instance.kind.kind));

  // yield all(switches.map((sw) => put(setOutputsUpToDate(sw.id, false))));
  yield all(switches.map((sw) => put(calculateOutputs(sw.id, sw.outputs))));
}

export function* watchSimulate() {
  yield takeEvery("circuit/SIMULATE", simulateSaga);
}
