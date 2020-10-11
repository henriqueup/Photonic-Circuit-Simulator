import { put, takeEvery } from "redux-saga/effects";
import { store } from "..";
import { PORT_WIDTH } from "../../models/Port";
import { updatePos as updateConnectionPos } from "../ducks/connection";

function* setWorldTransformSaga(action) {
  const port = store.getState().port.instances.find(port => port.id === action.payload.id);
  if (port.target){
    const newX = port.worldX + PORT_WIDTH/2;
    const newY = port.worldY + PORT_WIDTH/2;
    yield put(updateConnectionPos(port.id, newX, newY));
  }
}

export function* watchSetWorldTransform() {
  yield takeEvery("port/SET_WORLD_TRANSFORM", setWorldTransformSaga);
}
