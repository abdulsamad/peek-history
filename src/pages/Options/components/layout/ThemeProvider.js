import { useState, useMemo } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@material-ui/core';

const stateDefaultValues = {
  theme: 'default',
  accent: '#64B5F6',
  font: 'sans-serif',
};

function ThemeProviderContainer({ children }) {
  const [state, setState] = useState(stateDefaultValues);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { theme, accent, font } = state;

  chrome.storage.sync.get(null, ({ theme, accent, font }) => {
    if (theme || accent || font) {
      setState({
        theme: theme ? theme : stateDefaultValues.theme,
        accent: accent ? accent : stateDefaultValues.accent,
        font: font ? font : stateDefaultValues.font,
      });
    }
  });

  const customTheme = useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiCssBaseline: {
            '@global': {
              body: {
                backgroundColor:
                  theme === 'default'
                    ? prefersDarkMode
                      ? '#222'
                      : '#f5f5f5'
                    : theme === 'dark'
                    ? '#222'
                    : '#f5f5f5',
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflowX: 'hidden',
                margin: '0',
              },
              '*::-webkit-scrollbar': {
                backgroundColor:
                  theme === 'default'
                    ? prefersDarkMode
                      ? '#000'
                      : '#fff'
                    : theme === 'dark'
                    ? '#000'
                    : '#fff',
                border: 'none',
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: accent,
                borderRadius: 10,
              },
            },
          },
        },
        palette: {
          type:
            theme === 'default'
              ? prefersDarkMode
                ? 'dark'
                : 'light'
              : theme === 'dark'
              ? 'dark'
              : 'light',
          primary: {
            main: accent,
          },
          secondary: {
            main: '#F44336',
          },
          background: {
            default:
              theme === 'default'
                ? prefersDarkMode
                  ? '#222'
                  : '#f5f5f5'
                : theme === 'dark'
                ? '#222'
                : '#f5f5f5',
            paper:
              theme === 'default'
                ? prefersDarkMode
                  ? '#000'
                  : '#f5f5f5'
                : theme === 'dark'
                ? '#000'
                : '#f5f5f5',
          },
        },
        typography: {
          fontFamily: font,
        },
      }),
    [theme, accent, font, prefersDarkMode],
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviderContainer;
