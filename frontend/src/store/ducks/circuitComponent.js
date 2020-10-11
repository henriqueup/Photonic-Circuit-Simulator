import createCircuitComponent from "../../models/CircuitComponent";

// Action Types
export const Types = {
  CREATE: "circuitComponent/CREATE",
  CREATE_WITH_DATA: "circuitComponent/CREATE_WITH_DATA",
  UPDATE_POS: "circuitComponent/UPDATE_POS",
  CONFIRM_CREATION: "circuitComponent/CONFIRM_CREATION",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_WITH_DATA:
      return {
        ...state,
        instances: state.instances.concat([createCircuitComponent(action.payload.data)]),
      };
    case Types.UPDATE_POS:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                x: action.payload.x,
                y: action.payload.y,
              }
            : content
        ),
      };
    case Types.CONFIRM_CREATION:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                confirmedCreation: true
              }
            : content
        ),
      }
    default:
      return state;
  }
}

// Action Creators
export function create(kind) {
  return {
    type: Types.CREATE,
    payload: {
      kind: kind,
    },
  };
}

export function createWithData(data) {
  return {
    type: Types.CREATE_WITH_DATA,
    payload: {
      data: data,
    },
  };
}

export function updatePos(id, x, y) {
  return {
    type: Types.UPDATE_POS,
    payload: {
      id: id,
      x: x,
      y: y,
    },
  };
}

export function confirmCreation(id) {
  return {
    type: Types.CONFIRM_CREATION,
    payload: {
      id: id
    }
  }
}