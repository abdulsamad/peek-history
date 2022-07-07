import { Action } from "@reduxjs/toolkit";

const tabsReducer = (state = [], action: Action) => {
  switch (action.type) {
    case "":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default tabsReducer;
