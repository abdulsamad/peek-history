import {
	makeStyles,
	ListItem,
	ListItemText,
	ListItemIcon,
	Avatar,
	Typography,
	Link,
} from '@material-ui/core';

import { usePopupState } from '../../../context/popupContext';

const useStyles = makeStyles((theme) => ({
	list: {
		width: '100%',
		padding: 0,
	},
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
		marginRight: '16px',
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
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		'& p': {
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
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

function RecentsTabsListItem({ title, url, sessionId }) {
	const { hideURL } = usePopupState();
	const classes = useStyles();

	return (
		<ListItem divider={true} className={classes.listItem}>
			<Link
				href='#'
				color='inherit'
				block='true'
				onClick={() => chrome.sessions.restore(sessionId)}
				className={`link ${classes.anchor}`}
				underline='none'>
				<ListItemIcon className={classes.listItemIcon}>
					<Avatar
						src={`chrome://favicon/${url}`}
						alt={`${url} Favicon`}
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
					secondary={!hideURL && url}
					secondaryTypographyProps={{ title: url }}
				/>
			</Link>
		</ListItem>
	);
}

export default RecentsTabsListItem;
