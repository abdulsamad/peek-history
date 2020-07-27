import React, { useEffect } from 'react';
import { usePopupState } from '../../../context/popupContext';
import {
	makeStyles,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction,
	IconButton,
	Divider,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
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
	loaderRoot: {
		position: 'absolute',
		top: 60,
		bottom: 60,
		width: '100%',
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		overflow: 'hidden',
	},
	list: {
		width: '100%',
		padding: 0,
	},
	listItem: {
		flexGrow: 1,
	},
	textContainer: {
		'& span': {
			width: 'calc(100% - 25px)',
		},
		'& p': {
			width: 'calc(100% - 20px)',
		},
	},
	listItemSecondaryAction: {
		width: '47px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
}));

function HistoryList() {
	const { historyItems, hideURL, loading, searchError } = usePopupState();
	const classes = useStyles();

	useEffect(() => {
		window.addEventListener('keydown', shortcutFunc, false);

		return () => {
			window.removeEventListener('keydown', shortcutFunc, false);
		};
	}, []);

	const loadingElem = () => {
		let content = [];
		const length = hideURL ? 10 : 7;

		for (let i = 0; i < length; i++) {
			content.push(
				<>
					<ListItem className={classes.listItem}>
						<ListItemIcon>
							<Skeleton variant='circle' width={20} height={20} />
						</ListItemIcon>
						<ListItemText
							className={classes.textContainer}
							primary={<Skeleton />}
							secondary={!hideURL && <Skeleton />}
						/>
						<ListItemSecondaryAction className={classes.listItemSecondaryAction}>
							<IconButton edge='end'>
								<Skeleton variant='circle' width={20} height={20} />
							</IconButton>
							<Skeleton width={47} />
						</ListItemSecondaryAction>
					</ListItem>
					<Divider />
				</>,
			);
		}

		return (
			<div className={classes.loaderRoot}>
				<List>{content}</List>
			</div>
		);
	};

	if (searchError) return <NotFound search={true} />;

	if (!loading && historyItems.length <= 0) return <NotFound search={false} />;

	return loading ? (
		loadingElem()
	) : (
		<div className={classes.root}>
			<List component='div' aria-label='History Items' className={classes.list}>
				{historyItems.map((historyItem) => (
					<HistoryListItem
						key={historyItem.id}
						loading={loading}
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
