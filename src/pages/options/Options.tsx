import React from "react";
import { Provider } from "react-redux";

import store from "./redux/store";

import ThemeProvider from "@src/theme";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import Footer from "./layout/Footer";

const Options: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider fullWidth>
      <Navbar title="Peek History" />
      <Content />
      <Footer />
    </ThemeProvider>
  </Provider>
);

export default Options;
