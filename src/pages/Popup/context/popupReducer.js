import * as types from './types';

export default (state, action) => {
	switch (action.type) {
		case types.GET_HISTORY:
			return {
				...state,
				historyItems: state.historyItems.concat(action.payload),
				loading: false,
			};

		case types.SEARCH_HISTORY:
			return {
				...state,
				historyItems: action.payload,
				loading: false,
				searchError: false,
			};

		case types.SEARCH_ERROR:
			return {
				...state,
				historyItems: [],
				loading: false,
				searchError: true,
			};

		case types.GET_RECENT_TABS:
			return {
				...state,
				recentTabs: action.payload,
			};

		case types.GET_OTHER_TABS:
			return {
				...state,
				otherTabs: action.payload,
			};

		case types.UPDATE_ACTIVE_TAB_NUM:
			return {
				...state,
				activeTabNum: action.payload,
			};

		case types.DELETE_HISTORY:
			return {
				...state,
				historyItems: state.historyItems.filter((item) => item.url !== action.payload),
			};

		case types.HIDE_URL:
			return {
				...state,
				hideURL: action.payload,
			};

		case types.POPUP_WIDTH:
			return {
				...state,
				popupWidth: action.payload,
			};

		default:
			return state;
	}
};
