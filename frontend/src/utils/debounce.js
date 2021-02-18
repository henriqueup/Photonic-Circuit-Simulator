import _ from "lodash";

let debounceFunction = null;

export const createDebounce = (func, delay) => {
  debounceFunction = _.debounce(func, delay);
};

export const applyDebounce = (params) => {
  if (debounceFunction !== null) {
    debounceFunction(...params);
  }
};
