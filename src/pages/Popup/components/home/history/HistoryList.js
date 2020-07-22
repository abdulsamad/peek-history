import React, { useEffect } from 'react';
import { makeStyles, List } from '@material-ui/core';
import { usePopupState } from '../../../context/popupContext';
import HistoryListItem from './HistoryListItem';
import NotFound from '../misc/NotFound';
import shortcutFunc from './shortcut';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		top: 60,
		bottom: 60,
		width: '100%',
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		overflowX: 'hidden',
		overflowY: 'scroll',
	},
	list: {
		width: '100%',
		padding: 0,
	},
}));

function HistoryList() {
	const { historyItems, hideURL } = usePopupState();
	const classes = useStyles();

	useEffect(() => {
		window.addEventListener('keydown', shortcutFunc, false);

		return () => {
			window.removeEventListener('keydown', shortcutFunc, false);
		};
	}, []);

	if (historyItems.length <= 0) {
		return <NotFound />;
	}

	return (
		<div className={classes.root}>
			<List component='nav' aria-label='History Items' className={classes.list}>
				{historyItems.map((historyItem) => (
					<HistoryListItem
						key={historyItem.id}
						lastVisitTime={historyItem.lastVisitTime}
						title={historyItem.title}
						url={historyItem.url}
						hideURL={hideURL}
					/>
				))}
			</List>
		</div>
	);
}

export default HistoryList;
