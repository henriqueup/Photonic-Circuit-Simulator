import createCircuit, { DEFAULT_LABEL } from "../../models/Circuit";

// Action Types
export const Types = {
  CREATE: "circuit/CREATE",
  CREATE_WITH_ID: "circuit/CREATE_WITH_ID",
  SET_CURRENT: "circuit/SET_CURRENT",
  SAVE: "circuit/SAVE",
  ATTEMPT_SAVE: "circuit/ATTEMPT_SAVE",
  ADD_COMPONENT: "circuit/ADD_COMPONENT",
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
        current: action.payload.id,
      };
    case Types.SAVE:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                isSaved: true,
              }
            : content
        ),
      };
    case Types.ADD_COMPONENT:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                components: content.components.concat([action.payload.component_id]),
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

export function attemptSave() {
  return {
    type: Types.ATTEMPT_SAVE,
    payload: {},
  };
}

export function addComponent(component_id) {
  return {
    type: Types.ADD_COMPONENT,
    payload: {
      component_id: component_id,
    },
  };
}
