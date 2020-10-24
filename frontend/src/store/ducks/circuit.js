import createCircuit, { DEFAULT_LABEL } from "../../models/Circuit";

// Action Types
export const Types = {
  CREATE: "circuit/CREATE",
  CREATE_WITH_ID: "circuit/CREATE_WITH_ID",
  SET_CURRENT: "circuit/SET_CURRENT",
  SAVE: "circuit/SAVE",
  ATTEMPT_SAVE: "circuit/ATTEMPT_SAVE",
  ADD_COMPONENT: "circuit/ADD_COMPONENT",
  SIMULATE: "circuit/SIMULATE",
  SET_LABEL: "circuit/SET_LABEL",
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
        current: action.payload.label ? state.instances.find((instance) => instance.label === action.payload.label).id : action.payload.id,
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
    case Types.SET_LABEL:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                label: action.payload.label,
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

export function setCurrent(id = null, label = null) {
  return {
    type: Types.SET_CURRENT,
    payload: {
      id: id,
      label: label,
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

export function simulate() {
  return {
    type: Types.SIMULATE,
    payload: {},
  };
}

export function setLabel(label) {
  return {
    type: Types.SET_LABEL,
    payload: {
      label: label,
    },
  };
}
