import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import { getSettingsFromStorage } from "../../commons/redux/settings/thunks";
import Options from "@src/pages/options/Options";

// Load initial settings in chrome storage
store.dispatch(getSettingsFromStorage());

function init() {
  const appContainer = document.querySelector("#app");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }

  const root = createRoot(appContainer);
  root.render(
    <Provider store={store}>
      <Options />
    </Provider>
  );
}

init();
