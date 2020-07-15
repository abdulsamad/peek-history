import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PopupReducer from './popupReducer';
import * as types from './types';

const PopupContext = createContext();
const PopupContextDispatch = createContext();

function PopupProvider({ children }) {
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
			},
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

	const search = (text) => {
		if (state.activeTabNum === 0) {
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
				},
			);
		} else {
			const regex = new RegExp(text, 'gi');

			// Filter Recent Tabs
			const recentTabs = state.recentTabs.filter((obj) => {
				const tab = obj.tab;
				let win = obj.window;

				if (win) {
					const arr = win.tabs.filter(
						(windowObj) => windowObj.title.match(regex) || windowObj.url.match(regex),
					);

					if (arr.length > 0) {
						win.tabs = arr;
						return obj;
					}
				} else if ((tab && tab.title.match(regex)) || tab.url.match(regex)) {
					return obj;
				}
			});

			// Filter Other Tabs
			const otherTabs = state.otherTabs.filter((obj) => {
				const arr = obj.sessions.filter((session) => {
					const arr2 = session.window.tabs.filter(
						(tab) => tab.title.match(regex) || tab.url.match(regex),
					);

					if (arr2.length > 0) {
						session.window.tabs = arr2;
						return session;
					}
				});

				if (arr.length > 0) {
					obj.sessions = arr;
					return obj;
				}
			});

			dispatch({
				type: types.SEARCH_TABS,
				payload: { recentTabs, otherTabs },
			});
		}
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
			}),
		);
	};

	return (
		<PopupContext.Provider
			value={{
				historyItems: state.historyItems,
				recentTabs: state.recentTabs,
				otherTabs: state.otherTabs,
				activeTabNum: state.activeTabNum,
			}}>
			<PopupContextDispatch.Provider
				value={{
					search,
					setActiveTabNum,
					deleteHistory,
				}}>
				{children}
			</PopupContextDispatch.Provider>
		</PopupContext.Provider>
	);
}

const usePopupState = () => {
	const context = useContext(PopupContext);

	if (context === undefined) {
		throw new Error('usePopupState must be used within a PopupContext Provider.');
	}

	return context;
};

const usePopupDispatch = () => {
	const context = useContext(PopupContextDispatch);

	if (context === undefined) {
		throw new Error('usePopupDispatch must be used within a PopupContext Provider.');
	}

	return context;
};

export { PopupProvider, usePopupState, usePopupDispatch };
