import React from "react";

import ThemeProvider from "@src/theme";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import Footer from "./layout/Footer";

const Options: React.FC = () => (
  <ThemeProvider fullWidth>
    <Navbar title={import.meta.env.VITE_EXTENSION_TITLE} />
    <Content />
    <Footer />
  </ThemeProvider>
);

export default Options;
