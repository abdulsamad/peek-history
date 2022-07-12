import React from "react";
import { Provider } from "react-redux";

import store from "./redux/store";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";
import ThemeProvider from "@src/theme";

const Popup = () => (
  <Provider store={store}>
    <ThemeProvider>
      <MainContainer>
        <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
        <Content />
        <BottomNavBar />
      </MainContainer>
    </ThemeProvider>
  </Provider>
);

export default Popup;
