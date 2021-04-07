import { forwardRef } from 'react';
import {
	makeStyles,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction,
	Avatar,
	IconButton,
	Link,
	Typography,
} from '@material-ui/core';

import DeleteModal from './DeleteModal';
import ConvertTimeAgo from '../misc/ConvertTimeAgo';

const useStyles = makeStyles((theme) => ({
	listItem: {
		flexGrow: 1,

		'&:hover': {
			background: 'rgba(0,0,0,0.1)',
			borderLeft: `5px solid ${theme.palette.primary.main}`,
		},

		'&:hover .link:focus': {
			background: 'none',
			borderLeft: 'none',
		},
	},
	listItemIcon: {
		height: 16,
		minWidth: 16,
		marginRight: 16,
		display: 'flex',
		alignItems: 'center',
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
	},
	deleteIcon: {
		padding: 0,
	},
	anchor: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',

		'&:focus': {
			paddingLeft: 15,
			background: 'rgba(0,0,0,0.1)',
			borderLeft: `5px solid ${theme.palette.primary.main}`,
		},
	},
}));

function HistoryListItem({ title, url, lastVisitTime, hideURL }, observerRef) {
	const classes = useStyles();

	return (
		<ListItem divider={true} className={classes.listItem} ref={observerRef}>
			<Link
				color='inherit'
				href={url}
				block='true'
				target='_blank'
				rel='noopener noreferrer'
				className={`link ${classes.anchor}`}
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
	);
}

export default forwardRef(HistoryListItem);
