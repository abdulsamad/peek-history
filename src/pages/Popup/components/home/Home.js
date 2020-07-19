import React from 'react';
import { usePopupState } from '../../context/popupContext';
import HistoryList from './history/HistoryList';
import TabsList from './tab/TabsList';
import Preloader from '../layout/Preloader';

function Home() {
	const { activeTabNum, loading } = usePopupState();

	if (loading) {
		return <Preloader />;
	}

	return activeTabNum ? <TabsList /> : <HistoryList />;
}

export default Home;
