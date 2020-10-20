import { takeEvery, put, call } from "redux-saga/effects";
import { confirmConnectionDelete, create } from "../ducks/connection";
import { store } from "../../store";
import createConnection from "../../models/Connection";
import { changePower, setConnected } from "../ducks/port";
import api from "../../api";

function* createConnectionSaga(action) {
  const ports = store.getState().port.instances;
  const connections = createConnection(ports, action.payload.points, action.payload.originPortID);

  if (connections && connections.length) {
    const connection = connections[0];

    const originPort = ports.find((port) => port.id === connection.originPortID);
    const response = yield call(api.setOutputs, originPort.parentID, originPort.id, connection.targetPortID);

    if (response.ok) {
      yield put(create(connection.points, connection.originPortID, connection.targetPortID));
      yield put(setConnected(connection.originPortID, connection.targetPortID));
      yield put(setConnected(connection.targetPortID, connection.originPortID));
      yield put(changePower(connection.targetPortID, originPort.power));
    } else {
      const responseText = yield response.text();
      console.log(responseText);
    }
  }
}

export function* watchCreateConnection() {
  yield takeEvery("connection/ATTEMPT_CREATION", createConnectionSaga);
}

function* deleteConnectionSaga(action) {
  const port = store.getState().port.instances.find((instance) => instance.id === action.payload.portID);

  if (port.target) {
    yield put(setConnected(port.target, null));
  }
  yield put(confirmConnectionDelete(action.payload.portID));
}

export function* watchDeleteConnection() {
  yield takeEvery("connection/DELETE", deleteConnectionSaga);
}
