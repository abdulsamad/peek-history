import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import { getHistory } from "./redux/history/thunks";
import { getRecentlyClosed, getDevices } from "./redux/tabs/thunks";
import Popup from "@src/pages/popup/Popup";

// Load inital {History, Recently Closed Tabs, Tabs from Other Devices}
store.dispatch(getHistory({}));
store.dispatch(getRecentlyClosed());
store.dispatch(getDevices());

function init() {
  const appContainer = document.querySelector("#app");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }

  const root = createRoot(appContainer);
  root.render(
    <Provider store={store}>
      <Popup />
    </Provider>
  );
}

init();
