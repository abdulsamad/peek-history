import React from 'react';
import HistoryList from './history/HistoryList';
import TabsList from './tab/TabsList';
import { usePopupState } from '../../context/popupContext';

function Home() {
	const { activeTabNum } = usePopupState();

	return activeTabNum ? <TabsList /> : <HistoryList />;
}

export default Home;
