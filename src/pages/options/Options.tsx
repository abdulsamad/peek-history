import React from "react";
import { useSelector } from "react-redux";

import ThemeProvider from "@src/common/theme";
import { RootState } from "./redux/store";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import Footer from "./layout/Footer";

const Options: React.FC = () => {
  const settings = useSelector((state: RootState) => state.settings);

  return (
    <ThemeProvider settings={settings} fullWidth>
      <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
      <Content settings={settings} />
      <Footer />
    </ThemeProvider>
  );
};

export default Options;
