import React, { useContext } from 'react';
import { makeStyles, List } from '@material-ui/core';
import HistoryListItem from './HistoryListItem';
import PopupContext from '../../../context/popupContext';

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
	const classes = useStyles();
	const popupContext = useContext(PopupContext);
	const { historyItems } = popupContext;

	return (
		<div className={classes.root}>
			<List component='nav' aria-label='History Items' className={classes.list}>
				{historyItems.map((historyItem) => (
					<HistoryListItem
						key={historyItem.id}
						lastVisitTime={historyItem.lastVisitTime}
						title={historyItem.title}
						url={historyItem.url}
					/>
				))}
			</List>
		</div>
	);
}

export default HistoryList;
