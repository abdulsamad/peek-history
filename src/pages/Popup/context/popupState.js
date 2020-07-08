import React, { useEffect, useReducer } from 'react';
import PopupContext from './popupContext';
import PopupReducer from './popupReducer';
import * as types from './types';

function PopupState(props) {
  const initialState = {
    historyItems: [],
    recentTabs: [],
    otherTabs: [],
    activeTabNum: 0,
  };

  const [state, dispatch] = useReducer(PopupReducer, initialState);

  useEffect(() => {
    chrome.history.search(
      {
        text: '',
        maxResults: 50,
      },
      (historyItem) => {
        dispatch({
          type: types.GET_HISTORY,
          payload: historyItem,
        });
      }
    );

    chrome.sessions.getRecentlyClosed((recentTabs) => {
      dispatch({
        type: types.GET_RECENT_TABS,
        payload: recentTabs,
      });
    });

    chrome.sessions.getDevices((otherTabs) => {
      dispatch({
        type: types.GET_OTHER_TABS,
        payload: otherTabs,
      });
    });
  }, []);

  const searchHistory = (text) => {
    chrome.history.search(
      {
        text: text,
        maxResults: 50,
        startTime: 157784760000,
        endTime: Date.now(),
      },
      (historyItem) => {
        dispatch({
          type: types.SEARCH_HISTORY,
          payload: historyItem,
        });
      }
    );
  };

  const setActiveTabNum = (num) => {
    dispatch({
      type: types.UPDATE_ACTIVE_TAB_NUM,
      payload: num,
    });
  };

  const deleteHistory = (url) => {
    chrome.history.deleteUrl(
      { url: url },
      dispatch({
        type: types.DELETE_HISTORY,
        payload: url,
      })
    );
  };

  return (
    <PopupContext.Provider
      value={{
        historyItems: state.historyItems,
        recentTabs: state.recentTabs,
        otherTabs: state.otherTabs,
        activeTabNum: state.activeTabNum,
        searchHistory,
        setActiveTabNum,
        deleteHistory,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
}

export default PopupState;
