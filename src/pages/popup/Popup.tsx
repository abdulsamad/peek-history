import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";
import ThemeProvider from "@src/commons/theme";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./redux/store";
import { setShowUpdatePopup } from "./redux/ui/ui-slice";
import Notification from "./layout/update/Notification";

const Popup = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onChange = async (
      changes: chrome.storage.StorageChange,
      areaName: "sync" | "local" | "managed" | "session"
    ) => {
      switch (areaName) {
        case "sync" && changes.newValue?.showUpdateMessage:
          dispatch(setShowUpdatePopup(true));
          break;
      }
    };

    // Add storage event listener
    chrome.storage.onChanged.addListener(onChange);

    return () => {
      // Remove storage event listener
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, []);

  return (
    <ThemeProvider settings={settings}>
      <MainContainer>
        <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
        <Content settings={settings} />
        <BottomNavBar />
      </MainContainer>
      {/* Update Notification/Changes */}
      <Notification showUpdatePopup={ui.showUpdatePopup} />
    </ThemeProvider>
  );
};

export default Popup;
