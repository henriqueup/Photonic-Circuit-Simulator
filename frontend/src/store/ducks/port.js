import createPort from "../../models/Port";

// Action Types
export const Types = {
  CREATE: "port/CREATE",
};

// Reducer
const INITIAL_STATE = {
  ports: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state,
        ports: state.ports.concat([createPort(action.payload.y, action.payload.data, action.payload.isInput)]),
      };
    default:
      return state;
  }
}

// Action Creators
export function create(y, data, isInput = true) {
  return {
    type: Types.CREATE,
    payload: {
      y: y,
      data: data,
      isInput: isInput,
    },
  };
}
