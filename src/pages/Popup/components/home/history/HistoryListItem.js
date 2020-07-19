import React from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction,
	Avatar,
	IconButton,
	Divider,
	Link,
	Typography,
} from '@material-ui/core';
import DeleteModal from './DeleteModal';
import ConvertTimeAgo from '../misc/ConvertTimeAgo';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	listItemIcon: {
		height: 32,
		minWidth: 32,
	},
	favicon: {
		borderRadius: 0,
		backgroundColor: 'transparent',
		width: 16,
		height: 16,
	},
	textContainer: {
		whiteSpace: 'nowrap',

		'& span': {
			width: 'calc(100% - 25px)',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		'& p': {
			width: 'calc(100% - 20px)',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
	},
	listItemSecondaryAction: {
		width: '47px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',

		'& > span': {
			backgroundColor: theme.palette.background.paper,
		},
	},
	deleteIcon: {
		padding: 0,
	},
	anchor: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
}));

function HistoryListItem({ title, url, lastVisitTime, hideURL }) {
	const classes = useStyles();

	return (
		<>
			<ListItem className={classes.root}>
				<Link
					color='inherit'
					href={url}
					block='true'
					target='_blank'
					rel='noopener noreferrer'
					className={classes.anchor}
					underline='none'>
					<ListItemIcon className={classes.listItemIcon}>
						<Avatar
							src={`chrome://favicon/${url}`}
							alt={`${url.domain} Favicon`}
							className={classes.favicon}
						/>
					</ListItemIcon>
					<ListItemText
						className={classes.textContainer}
						primary={
							title ? (
								<Typography title={title} variant='body1' display='block'>
									{title}
								</Typography>
							) : (
								<Typography variant='body1' color='error' display='block'>
									(Title Not Available)
								</Typography>
							)
						}
						primaryTypographyProps={{ title: title }}
						secondary={!hideURL && url}
						secondaryTypographyProps={{ title: url }}
					/>
				</Link>
				<ListItemSecondaryAction className={classes.listItemSecondaryAction}>
					<IconButton edge='end' aria-label='delete' className={classes.deleteIcon}>
						<DeleteModal url={url} />
					</IconButton>
					<Typography variant='caption' display='block' noWrap>
						{ConvertTimeAgo(lastVisitTime)}
					</Typography>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</>
	);
}

HistoryListItem.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	lastVisitTime: PropTypes.number.isRequired,
	hideURL: PropTypes.bool.isRequired,
};

export default HistoryListItem;
