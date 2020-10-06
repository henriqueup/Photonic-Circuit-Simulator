import createCircuit, { DEFAULT_LABEL } from "../../models/Circuit";

// Action Types
export const Types = {
  CREATE: "circuit/CREATE",
  CREATE_WITH_ID: "circuit/CREATE_WITH_ID",
  SET_CURRENT: "circuit/SET_CURRENT",
  SAVE: "circuit/SAVE",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
  current: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_WITH_ID:
      return {
        ...state,
        instances: state.instances.concat([createCircuit(action.payload.id, action.payload.label)]),
      };
    case Types.SET_CURRENT:
      return {
        ...state,
        current: state.instances.find((instance) => instance.id === action.payload.id),
      };
    case Types.SAVE:
      return {
        ...state,
        current: {
          ...state.current,
          isSaved: true,
        },
        instances: state.instances.map((content) =>
          content.id === state.current.id
            ? {
                ...content,
                isSaved: true,
              }
            : content
        ),
      };
    default:
      return state;
  }
}

// Action Creators
export function create() {
  return {
    type: Types.CREATE,
    payload: {
      id: null,
      label: DEFAULT_LABEL,
    },
  };
}

export function createWithID(id) {
  return {
    type: Types.CREATE_WITH_ID,
    payload: {
      id: id,
      label: DEFAULT_LABEL,
    },
  };
}

export function setCurrent(id) {
  return {
    type: Types.SET_CURRENT,
    payload: {
      id: id,
    },
  };
}

export function save() {
  return {
    type: Types.SAVE,
    payload: {},
  };
}
