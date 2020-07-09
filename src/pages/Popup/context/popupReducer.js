import * as types from './types';

export default (state, action) => {
	switch (action.type) {
		case types.GET_HISTORY:
			return {
				...state,
				historyItems: action.payload,
			};

		case types.SEARCH_HISTORY:
			return {
				...state,
				historyItems: action.payload,
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

		default:
			return state;
	}
};
