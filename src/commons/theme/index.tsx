import React, { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  useMediaQuery,
  lighten,
  darken,
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
          MuiAppBar: {
            styleOverrides: {
              root: {
                color: accentFont,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              textPrimary: {
                color: accentFont,
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
