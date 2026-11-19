import React, { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

import { ISettings } from "../redux/settings/defaults";

interface IThemeProvider {
  children: React.ReactNode;
  settings: ISettings;
  fullWidth?: boolean;
}

const ThemeProvider = ({ children, fullWidth, settings }: IThemeProvider) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { theme, accent, accentFont, popupWidth, font } = settings;

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
          // light/dark shades are derived by MUI
          primary: {
            main: accent,
            // Text on accent backgrounds (navbar, contained buttons)
            contrastText: accentFont,
          },
          error: {
            main: "#F44336",
          },
          warning: {
            main: "#FFC107",
          },
          success: {
            main: "#4CAF50",
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
                height: fullWidth ? "auto" : 600,
                width: fullWidth ? "100%" : popupWidth,
                overflow: "hidden",
                overflowY: fullWidth ? "auto" : "hidden",
              },
              "#app": {
                height: fullWidth ? "auto" : 600,
                width: fullWidth ? "100%" : popupWidth,
                overflow: "hidden",
                overflowY: fullWidth ? "auto" : "hidden",
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
    [theme, accent, accentFont, popupWidth, font]
  );

  return (
    <MUIThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
