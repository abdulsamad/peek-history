import React, { useContext } from 'react';
import HistoryList from './history/HistoryList';
import TabsList from './tab/TabsList';
import PopupContext from '../../context/popupContext';

function Home() {
	const popupContext = useContext(PopupContext);
	const { activeTabNum } = popupContext;

	if (activeTabNum === 0) {
		return <HistoryList />;
	}

	if (activeTabNum === 1) {
		return <TabsList />;
	}
}

export default Home;
