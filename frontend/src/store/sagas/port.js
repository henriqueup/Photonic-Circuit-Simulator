import { put, takeEvery } from "redux-saga/effects";
import { store } from "..";
import { PORT_WIDTH } from "../../models/Port";
import { setOutputsUpToDate } from "../ducks/circuitComponent";
import { updatePos as updateConnectionPos } from "../ducks/connection";
import { updateConnectionPos as updateCircuitConnectionPos } from "../ducks/circuit";
import { changePower } from "../ducks/port";

function* setWorldTransformSaga(action) {
  const port = store.getState().port.instances.find((port) => port.id === action.payload.id);
  if (port.target) {
    const newX = port.worldX + PORT_WIDTH / 2;
    const newY = port.worldY + PORT_WIDTH / 2;
    yield put(updateConnectionPos(port.id, newX, newY));
    yield put(updateCircuitConnectionPos(port.id, newX, newY));
  }
}

export function* watchSetWorldTransform() {
  yield takeEvery("port/SET_WORLD_TRANSFORM", setWorldTransformSaga);
}

function* changePowerSaga(action) {
  //port which is changing power
  const originPort = store.getState().port.instances.find((port) => port.id === action.payload.id);
  yield put(setOutputsUpToDate(originPort.parentID, false));

  if (originPort.target) {
    const targetPort = store.getState().port.instances.find((port) => port.id === originPort.target);

    if (targetPort.power !== action.payload.power) {
      yield put(changePower(targetPort.id, action.payload.power));
    }
  }
}

export function* watchChangePower() {
  yield takeEvery("port/CHANGE_POWER", changePowerSaga);
}
