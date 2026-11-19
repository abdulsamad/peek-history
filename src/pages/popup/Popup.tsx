import React from "react";
import { useSelector } from "react-redux";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";
import ThemeProvider from "@src/commons/theme";
import { RootState } from "./redux/store";
import Notification from "./layout/update/Notification";

const Popup = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const ui = useSelector((state: RootState) => state.ui);

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
