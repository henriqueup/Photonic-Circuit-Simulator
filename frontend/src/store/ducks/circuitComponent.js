import createCircuitComponent from "../../models/CircuitComponent";

// Action Types
export const Types = {
  CREATE: "circuitComponent/CREATE",
  CREATE_WITH_DATA: "circuitComponent/CREATE_WITH_DATA",
  UPDATE_POS: "circuitComponent/UPDATE_POS",
  CONFIRM_CREATION: "circuitComponent/CONFIRM_CREATION",
  SET_SELECTED: "circuitComponent/SET_SELECTED",
  SELECT: "circuitComponent/SELECT",
  DESELECT: "circuitComponent/DESELECT",
  SET_POWER: "circuitComponent/SET_POWER",
  CALCULATE_OUTPUTS: "circuitComponent/CALCULATE_OUTPUTS",
  SET_OUTPUTS_UPTODATE: "circuitComponent/SET_OUTPUTS_UPTODATE",
  DELETE_SELECTED: "circuitComponent/DELETE_SELECTED",
  CONFIRM_DELETE_SELECTED: "circuitComponent/CONFIRM_DELETE_SELECTED",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
  selected: null,
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
        selected: {
          ...state.selected,
          x: action.payload.x,
          y: action.payload.y,
        },
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
                confirmedCreation: true,
              }
            : content
        ),
      };
    case Types.SET_SELECTED:
      return {
        ...state,
        selected: state.instances.find((instance) => instance.id === action.payload.id),
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                selected: true,
                kind: {
                  ...content.kind,
                  image: content.kind.alternateImage,
                  alternateImage: content.kind.image,
                },
              }
            : content
        ),
      };
    case Types.DESELECT:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                selected: false,
                kind: {
                  ...content.kind,
                  image: content.kind.alternateImage,
                  alternateImage: content.kind.image,
                },
              }
            : content
        ),
      };
    case Types.SET_OUTPUTS_UPTODATE:
      return {
        ...state,
        selected: {
          ...state.selected,
          outputsUpToDate: action.payload.id === state.selected.id ? action.payload.outputsUpToDate : state.selected.outputsUpToDate,
        },
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                outputsUpToDate: action.payload.outputsUpToDate,
              }
            : content
        ),
      };
    case Types.CONFIRM_DELETE_SELECTED:
      return {
        ...state,
        selected: null,
        instances: state.instances.filter((content) => content.id !== state.selected.id),
      };
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
      id: id,
    },
  };
}

export function setSelected(id) {
  return {
    type: Types.SET_SELECTED,
    payload: {
      id: id,
    },
  };
}

export function select(id) {
  return {
    type: Types.SELECT,
    payload: {
      id: id,
    },
  };
}

export function deselect(id) {
  return {
    type: Types.DESELECT,
    payload: {
      id: id,
    },
  };
}

export function setPower(componentID, portID, power) {
  return {
    type: Types.SET_POWER,
    payload: {
      componentID: componentID,
      portID: portID,
      power: power,
    },
  };
}

export function calculateOutputs(id, outputIDs) {
  return {
    type: Types.CALCULATE_OUTPUTS,
    payload: {
      id: id,
      outputIDs: outputIDs,
    },
  };
}

export function setOutputsUpToDate(id, outputsUpToDate) {
  return {
    type: Types.SET_OUTPUTS_UPTODATE,
    payload: {
      id: id,
      outputsUpToDate: outputsUpToDate,
    },
  };
}

export function deleteSelected() {
  return {
    type: Types.DELETE_SELECTED,
    payload: {},
  };
}

export function confirmSelectedDelete() {
  return {
    type: Types.CONFIRM_DELETE_SELECTED,
    payload: {},
  };
}
