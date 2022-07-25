import React from "react";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";
import ThemeProvider from "@src/common/theme";
import useStorageConfig from "@src/hooks/useStorageConfig";

const Popup = () => {
  const settings = useStorageConfig();

  return (
    <ThemeProvider settings={settings}>
      <MainContainer>
        <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
        <Content />
        <BottomNavBar />
      </MainContainer>
    </ThemeProvider>
  );
};

export default Popup;
