import React, { useRef, useCallback, Fragment } from 'react';
import { usePopupState, usePopupDispatch } from '../../../context/popupContext';
import {
	makeStyles,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import HistoryListItem from './HistoryListItem';
import NotFound from '../misc/NotFound';

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
	skeletonLoaderRoot: {
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
	circularProgressContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

function HistoryList() {
	const { historyItems, hideURL, loading, searchError } = usePopupState();
	const { getHistory } = usePopupDispatch();
	const classes = useStyles();
	const observer = useRef();
	const prevLastVisitTime = useRef();
	const listRef = useRef();

	const loadingElem = () => {
		let content = [];
		const length = hideURL ? 10 : 7;

		for (let i = 0; i < length; i++) {
			content.push(
				<ListItem key={i} divider={true} className={classes.listItem}>
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
				</ListItem>,
			);
		}

		return (
			<div className={classes.skeletonLoaderRoot}>
				<List>{content}</List>
			</div>
		);
	};

	const lastElem = useCallback(
		(node, lastVisitTime) => {
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					node.scrollIntoView();
					listRef.current.style.overflowY = 'hidden';
					getHistory({ endTime: lastVisitTime });
					observer.current.disconnect();
					listRef.current.style.overflowY = 'scroll';
				}
			});

			if (lastVisitTime !== prevLastVisitTime.current && node) observer.current.observe(node);
			prevLastVisitTime.current = lastVisitTime;
		},
		[getHistory],
	);

	if (searchError) return <NotFound search={true} />;

	if (!loading && historyItems.length <= 0) return <NotFound search={false} />;

	return loading ? (
		loadingElem()
	) : (
		<div className={classes.root} ref={listRef}>
			<List component='div' aria-label='History Items' className={classes.list}>
				{historyItems.map(({ id, lastVisitTime, title, url }, index) => {
					if (historyItems.length === ++index) {
						return (
							<Fragment key={id + index}>
								<HistoryListItem
									loading={loading}
									lastVisitTime={lastVisitTime}
									title={title}
									url={url}
									hideURL={hideURL}
								/>
								<ListItem
									divider={true}
									ref={(node) => lastElem(node, lastVisitTime)}
									className={classes.listItem}>
									<ListItemText
										className={classes.circularProgressContainer}
										primary={<CircularProgress size='1.5rem' />}
									/>
								</ListItem>
							</Fragment>
						);
					} else {
						return (
							<HistoryListItem
								key={id + index}
								loading={loading}
								lastVisitTime={lastVisitTime}
								title={title}
								url={url}
								hideURL={hideURL}
							/>
						);
					}
				})}
			</List>
		</div>
	);
}

export default HistoryList;
