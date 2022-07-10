import React, { useState, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

const defaultConfig = {
  theme: "default",
  accent: "#64B5F6",
  width: 400,
  font: "sans-serif",
  hideURL: false,
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState(defaultConfig);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Destructure config
  const { theme, accent, width, font, hideURL } = config;

  useEffect(() => {
    //
  }, []);

  const customTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode:
            theme === "default"
              ? prefersDarkMode
                ? "dark"
                : "light"
              : theme === "dark"
              ? "dark"
              : "light",
          primary: {
            main: accent,
          },
          secondary: {
            main: "#F44336",
          },
          background: {
            default:
              theme === "default"
                ? prefersDarkMode
                  ? "#222"
                  : "#f5f5f5"
                : theme === "dark"
                ? "#222"
                : "#f5f5f5",
            paper:
              theme === "default"
                ? prefersDarkMode
                  ? "#222"
                  : "#f5f5f5"
                : theme === "dark"
                ? "#222"
                : "#f5f5f5",
          },
        },
        typography: {
          fontFamily: font,
        },
      }),
    []
  );

  return (
    <MUIThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
