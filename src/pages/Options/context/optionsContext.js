import React, { createContext, useContext, useReducer, useEffect } from 'react';
import OptionsReducer from './optionsReducer';
import * as types from './types';

const OptionsContext = createContext();
const OptionsContextDispatch = createContext();

function OptionsProvider({ children }) {
	const initialState = {
		theme: 'default',
		font: 'sans-serif',
		accent: '#64B5F6',
		excludedURLs: [],
		incognito: false,
	};
	const [state, dispatch] = useReducer(OptionsReducer, initialState);

	useEffect(() => {
		chrome.storage.sync.get(null, ({ theme, font, accent, incognito, excludedObj }) => {
			if (theme) setTheme(theme);
			if (font) setFont(font);
			if (accent) setAccent(accent);
			if (incognito) setIncognito(incognito);
			if (excludedObj) getExcludedURL(excludedObj.excludedUrlArr);
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

	const getExcludedURL = (urls) => {
		dispatch({
			type: types.GET_EXCLUDED_URL,
			payload: urls,
		});
	};

	const addExcludeURL = (link) => {
		const url = new URL(link);
		const filteredUrl = `*://${url.host}${url.pathname}*`;

		chrome.storage.sync.get('excludedObj', ({ excludedObj }) => {
			if (excludedObj === undefined) {
				chrome.storage.sync.set({
					excludedObj: { excludedUrlArr: [url.href], filteredArr: [filteredUrl] },
				});
			} else {
				if (excludedObj.excludedUrlArr && excludedObj.excludedUrlArr.includes(url.href)) {
					// Check Array for duplicacy
					console.log('URL already added');
					// TODO: Add Toast Message
					return false;
				} else {
					// Update Array in Chrome Storage
					const obj = { ...excludedObj };
					obj.excludedUrlArr.push(url.href);
					obj.filteredArr.push(filteredUrl);
					chrome.storage.sync.set({
						excludedObj: obj,
					});
				}
			}

			dispatch({
				type: types.ADD_EXCLUDED_URL,
				payload: url.href,
			});
		});
	};

	const removeExcludedURL = (url) => {
		chrome.storage.sync.get('excludedObj', ({ excludedObj }) => {
			const obj = { ...excludedObj };
			const link = new URL(url);
			const filteredUrl = `*://${link.host}${link.pathname}*`;
			const excludedUrlArr = obj.excludedUrlArr.filter((val) => url !== val);
			const filteredArr = obj.filteredArr.filter((val) => filteredUrl !== val);

			chrome.storage.sync.set({
				excludedObj: { excludedUrlArr, filteredArr },
			});
		});

		dispatch({
			type: types.REMOVE_EXCLUDED_URL,
			payload: url,
		});
	};

	const removeAllExcludedURLs = () => {
		chrome.storage.sync.remove('excludedObj');

		dispatch({
			type: types.REMOVE_ALL_EXCLUDED_URLS,
		});
	};

	const setIncognito = (bool) => {
		dispatch({ type: types.SET_INCOGNITO, payload: bool });
	};

	return (
		<OptionsContext.Provider
			value={{
				theme: state.theme,
				font: state.font,
				accent: state.accent,
				hideURL: state.hideURL,
				excludedURLs: state.excludedURLs,
				incognito: state.incognito,
			}}>
			<OptionsContextDispatch.Provider
				value={{
					setTheme,
					setFont,
					setAccent,
					setIncognito,
					addExcludeURL,
					removeExcludedURL,
					removeAllExcludedURLs,
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

export { OptionsProvider, useOptionsState, useOptionsDispatch };
