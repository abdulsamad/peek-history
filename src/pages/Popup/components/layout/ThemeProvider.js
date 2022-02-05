import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@material-ui/core';

const stateDefaultValues = {
  theme: 'default',
  accent: '#64B5F6',
  width: 400,
  font: 'sans-serif',
};

function ThemeProviderContainer({ children }) {
  const [state, setState] = useState(stateDefaultValues);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { theme, accent, width, font } = state;

  chrome.storage.sync.get(null, ({ theme, accent, popupWidth, font }) => {
    if (theme || accent || popupWidth || font) {
      setState({
        theme: theme ? theme : stateDefaultValues.theme,
        accent: accent ? accent : stateDefaultValues.accent,
        width: popupWidth ? popupWidth : stateDefaultValues.width,
        font: font ? font : stateDefaultValues.font,
      });
    }
  });

  const customTheme = useMemo(
    () =>
      createTheme({
        overrides: {
          MuiCssBaseline: {
            '@global': {
              body: {
                height: 600,
                width: width,
                overflow: 'hidden',
                margin: '0',
                transition: 'width 0.3s ease',
              },
              '*::-webkit-scrollbar': {
                backgroundColor:
                  theme === 'default'
                    ? prefersDarkMode
                      ? '#222'
                      : '#f9f9f9'
                    : theme === 'dark'
                    ? '#222'
                    : '#f9f9f9',
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
                  ? '#222'
                  : '#f5f5f5'
                : theme === 'dark'
                ? '#222'
                : '#f5f5f5',
          },
        },
        typography: {
          fontFamily: font,
        },
      }),
    [theme, accent, width, font, prefersDarkMode],
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ThemeProviderContainer.propTypes = {
  children: PropTypes.array,
};

export default ThemeProviderContainer;
