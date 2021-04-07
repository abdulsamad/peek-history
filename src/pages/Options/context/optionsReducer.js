import * as types from './types';

export default (state, action) => {
  switch (action.type) {
    case types.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case types.SET_FONT:
      return {
        ...state,
        font: action.payload,
      };

    case types.SET_ACCENT:
      return {
        ...state,
        accent: action.payload,
      };

    default:
      return {
        state,
      };
  }
};
