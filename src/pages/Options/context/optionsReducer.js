import * as types from './types';

export default (state, action) => {
	switch (action.type) {
		case types.SET_THEME:
			return {
				...state,
				theme: action.payload,
			};

		case types.SET_FONT:
			return {
				...state,
				font: action.payload,
			};

		case types.SET_ACCENT:
			return {
				...state,
				accent: action.payload,
			};

		case types.GET_EXCLUDED_URL:
			return {
				...state,
				excludedURLs: action.payload,
			};

		case types.ADD_EXCLUDED_URL:
			return {
				...state,
				excludedURLs: [action.payload, ...state.excludedURLs],
			};

		case types.REMOVE_EXCLUDED_URL:
			return {
				...state,
				excludedURLs: state.excludedURLs.filter((val) => val !== action.payload),
			};

		case types.REMOVE_ALL_EXCLUDED_URLS:
			return {
				...state,
				excludedURLs: [],
			};

		case types.SET_INCOGNITO:
			return {
				...state,
				incognito: action.payload,
			};

		default:
			return {
				state,
			};
	}
};
