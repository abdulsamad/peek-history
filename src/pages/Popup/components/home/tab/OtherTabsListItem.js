import React from 'react';
import { usePopupState } from '../../../context/popupContext';
import {
	makeStyles,
	ListItem,
	ListItemText,
	ListItemIcon,
	Avatar,
	Typography,
	List,
	Link,
} from '@material-ui/core';

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
			width: '100% ',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		'& p': {
			width: '100% ',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
	},
	windowAccordion: {
		display: 'flex',
		alignItems: 'center',

		'& button': {
			marginLeft: 10,
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

function RecentsTabsListItem({ tabs, sessionId }) {
	const { hideURL } = usePopupState();
	const classes = useStyles();

	return (
		<List component='div' aria-label='Tab on other device' className={classes.list} key={tabs.url}>
			{tabs.map((tab) => (
				<ListItem className={classes.listItem} divider={true} key={tab.url}>
					<Link
						href='#'
						color='inherit'
						block='true'
						onClick={() => chrome.sessions.restore(tab.sessionId)}
						className={`link ${classes.anchor}`}
						underline='none'>
						<ListItemIcon className={classes.listItemIcon}>
							<Avatar
								src={`chrome://favicon/${tab.url}`}
								alt={`${tab.url} Favicon`}
								className={classes.favicon}
							/>
						</ListItemIcon>
						<ListItemText
							className={classes.textContainer}
							primary={
								tab.title ? (
									<Typography title={tab.title} variant='body1' display='block'>
										{tab.title}
									</Typography>
								) : (
									<Typography variant='body1' color='error' display='block'>
										(Title Not Available)
									</Typography>
								)
							}
							secondary={!hideURL && tab.url}
							secondaryTypographyProps={{ title: tab.url }}
						/>
					</Link>
				</ListItem>
			))}
		</List>
	);
}

export default RecentsTabsListItem;
