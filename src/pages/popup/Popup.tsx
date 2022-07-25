import React from "react";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";
import ThemeProvider from "@src/theme";

const Popup = () => (
  <ThemeProvider>
    <MainContainer>
      <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
      <Content />
      <BottomNavBar />
    </MainContainer>
  </ThemeProvider>
);

export default Popup;
