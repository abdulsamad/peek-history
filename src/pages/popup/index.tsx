import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "@src/pages/popup/Popup";

function init() {
  const appContainer = document.querySelector("#app");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
