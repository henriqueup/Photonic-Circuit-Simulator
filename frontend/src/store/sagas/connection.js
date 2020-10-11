import { takeEvery, put } from "redux-saga/effects";
import { create } from "../ducks/connection";
import {store} from "../../store";
import createConnection from "../../models/Connection";
import { setConnected } from "../ducks/port";

function* createConnectionSaga(action) {
  const ports = store.getState().port.instances;
  const connections = createConnection(ports, action.payload.points, action.payload.originPortID);

  if (connections && connections.length){
    const connection = connections[0];

    yield put(create(connection.points, connection.originPortID, connection.targetPortID));
    yield put(setConnected(connection.originPortID, connection.targetPortID));
    yield put(setConnected(connection.targetPortID, connection.originPortID));
  }
}

export function* watchCreateConnection() {
  yield takeEvery("connection/ATTEMPT_CREATION", createConnectionSaga);
}
