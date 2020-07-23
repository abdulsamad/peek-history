import React from 'react';
import { usePopupState } from '../../context/popupContext';
import HistoryList from './history/HistoryList';
import TabsList from './tab/TabsList';

function Home() {
	const { activeTabNum } = usePopupState();

	return activeTabNum ? <TabsList /> : <HistoryList />;
}

export default Home;
