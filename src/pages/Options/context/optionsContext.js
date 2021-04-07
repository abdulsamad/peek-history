import { createContext, useContext, useReducer, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import OptionsReducer from './optionsReducer';
import * as types from './types';

const OptionsContext = createContext();
const OptionsContextDispatch = createContext();

function OptionsProvider({ children }) {
  const initialState = {
    theme: 'default',
    font: 'sans-serif',
    accent: '#64B5F6',
  };
  const [state, dispatch] = useReducer(OptionsReducer, initialState);

  useLayoutEffect(() => {
    chrome.storage.sync.get(null, ({ theme, font, accent }) => {
      if (theme) setTheme(theme);
      if (font) setFont(font);
      if (accent) setAccent(accent);
    });
  }, []);

  const setTheme = (theme) => {
    dispatch({
      type: types.SET_THEME,
      payload: theme,
    });
  };

  const setFont = (font) => {
    dispatch({
      type: types.SET_FONT,
      payload: font,
    });
  };

  const setAccent = (accent) => {
    dispatch({
      type: types.SET_ACCENT,
      payload: accent,
    });
  };

  return (
    <OptionsContext.Provider
      value={{
        theme: state.theme,
        font: state.font,
        accent: state.accent,
        hideURL: state.hideURL,
      }}>
      <OptionsContextDispatch.Provider
        value={{
          setTheme,
          setFont,
          setAccent,
        }}>
        {children}
      </OptionsContextDispatch.Provider>
    </OptionsContext.Provider>
  );
}

const useOptionsState = () => {
  const context = useContext(OptionsContext);

  if (context === undefined) {
    throw new Error('useOptionsState must be used within a OptionsContext Provider.');
  }

  return context;
};

const useOptionsDispatch = () => {
  const context = useContext(OptionsContextDispatch);

  if (context === undefined) {
    throw new Error('useOptionsDispatch must be used within a OptionsContext Provider.');
  }

  return context;
};

OptionsProvider.propTypes = {
  children: PropTypes.element,
};

export { OptionsProvider, useOptionsState, useOptionsDispatch };
