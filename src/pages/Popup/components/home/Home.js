import React, { useEffect } from 'react';
import { usePopupState } from '../../context/popupContext';
import HistoryList from './history/HistoryList';
import TabsList from './tab/TabsList';
import shortcutFunc from './misc/shortcuts';

/* Iterator */
function iteratorFunc(start = 0, end = Infinity, resetVal = 0) {
	let index = start;

	return {
		reset: () => (index = resetVal),
		prev: () => (index > 0 ? { value: --index, done: false } : { value: index, done: true }),
		next: () => (index < end ? { value: ++index, done: false } : { value: index, done: true }),
	};
}

const tabFocusNum = iteratorFunc(-1, Infinity, -1);
const linkFocusNum = iteratorFunc(-1, Infinity, -1);

function Home() {
	const { activeTabNum } = usePopupState();

	useEffect(() => {
		window.addEventListener(
			'keydown',
			(ev) => shortcutFunc({ ev, activeTabNum, linkFocusNum, tabFocusNum }),
			true,
		);

		return () => {
			window.removeEventListener('keydown', shortcutFunc, true);
		};
	}, [activeTabNum]);

	return activeTabNum ? <TabsList /> : <HistoryList />;
}

export default Home;
