import React, { useState, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  useMediaQuery,
  lighten,
  darken,
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
            light: lighten(accent, 5),
            main: accent,
            dark: darken(accent, 5),
          },
          error: {
            light: lighten("#F44336", 5),
            main: "#F44336",
            dark: darken("#F44336", 5),
          },
          warning: {
            light: lighten("#FFC107", 5),
            main: "#FFC107",
            dark: darken("#FFC107", 5),
          },
          success: {
            light: lighten("#4CAF50", 5),
            main: "#4CAF50",
            dark: darken("#4CAF50", 5),
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
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: 600,
                width: width,
                overflow: "hidden",
              },
              "#app": {
                height: 600,
                width: width,
                overflow: "hidden",
              },
              "*::-webkit-scrollbar": {
                backgroundColor:
                  theme === "default"
                    ? prefersDarkMode
                      ? "#373737"
                      : "#edecec"
                    : theme === "dark"
                    ? "#373737"
                    : "#edecec",
                border: "none",
              },
              "*::-webkit-scrollbar-thumb": {
                backgroundColor: accent,
                borderRadius: 6,
              },
            },
          },
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
