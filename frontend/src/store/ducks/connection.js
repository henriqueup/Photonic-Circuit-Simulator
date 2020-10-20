// Action Types
export const Types = {
  CREATE: "connection/CREATE",
  ATTEMPT_CREATION: "connection/ATTEMPT_CREATION",
  UPDATE_POS: "connection/UPDATE_POS",
  DELETE: "connection/DELETE",
  CONFIRM_DELETE: "connection/CONFIRM_DELETE",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state,
        instances: state.instances.concat([{ ...action.payload }]),
      };
    case Types.UPDATE_POS:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.originPortID === action.payload.portID
            ? {
                ...content,
                points: [action.payload.newX, action.payload.newY, content.points[2], content.points[3]],
              }
            : content.targetPortID === action.payload.portID
            ? {
                ...content,
                points: [content.points[0], content.points[1], action.payload.newX, action.payload.newY],
              }
            : content
        ),
      };
    case Types.CONFIRM_DELETE:
      return {
        ...state,
        instances: state.instances.filter(
          (instance) => instance.targetPortID !== action.payload.portID && instance.originPortID !== action.payload.portID
        ),
      };
    default:
      return state;
  }
}

// Action Creators
export function create(points, originPortID, targetPortID) {
  return {
    type: Types.CREATE,
    payload: {
      points: points,
      originPortID: originPortID,
      targetPortID: targetPortID,
    },
  };
}

export function attemptCreation(points, originPortID) {
  return {
    type: Types.ATTEMPT_CREATION,
    payload: {
      points: points,
      originPortID: originPortID,
    },
  };
}

export function updatePos(portID, newX, newY) {
  return {
    type: Types.UPDATE_POS,
    payload: {
      portID: portID,
      newX: newX,
      newY: newY,
    },
  };
}

export function deleteConnection(portID) {
  return {
    type: Types.DELETE,
    payload: {
      portID: portID,
    },
  };
}

export function confirmConnectionDelete(portID) {
  return {
    type: Types.CONFIRM_DELETE,
    payload: {
      portID: portID,
    },
  };
}
