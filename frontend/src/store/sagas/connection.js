import { takeEvery, put, call } from "redux-saga/effects";
import { create } from "../ducks/connection";
import {store} from "../../store";
import createConnection from "../../models/Connection";
import { setConnected } from "../ducks/port";
import api from "../../api";

function* createConnectionSaga(action) {
  const ports = store.getState().port.instances;
  const connections = createConnection(ports, action.payload.points, action.payload.originPortID);

  if (connections && connections.length){
    const connection = connections[0];

    const originPort = ports.find(port => port.id === connection.originPortID);
    yield call(api.setOutputs, originPort.parentID, originPort.id, connection.targetPortID);

    yield put(create(connection.points, connection.originPortID, connection.targetPortID));
    yield put(setConnected(connection.originPortID, connection.targetPortID));
    yield put(setConnected(connection.targetPortID, connection.originPortID));
  }
}

export function* watchCreateConnection() {
  yield takeEvery("connection/ATTEMPT_CREATION", createConnectionSaga);
}
