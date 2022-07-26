import React from "react";
import { useSelector } from "react-redux";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";
import ThemeProvider from "@src/commons/theme";
import { RootState } from "./redux/store";

const Popup = () => {
  const settings = useSelector((state: RootState) => state.settings);

  return (
    <ThemeProvider settings={settings}>
      <MainContainer>
        <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
        <Content settings={settings} />
        <BottomNavBar />
      </MainContainer>
    </ThemeProvider>
  );
};

export default Popup;
