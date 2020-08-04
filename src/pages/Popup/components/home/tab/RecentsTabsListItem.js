import React from 'react';
import { usePopupState } from '../../../context/popupContext';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
	makeStyles,
	ListItem,
	ListItemText,
	ListItemIcon,
	Avatar,
	Typography,
	List,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Link,
	Button,
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
	windowAccordion: {
		display: 'flex',
		alignItems: 'center',

		'& button': {
			marginLeft: 10,
		},
	},
	button: {
		color: '#f9f9f9',
	},
}));

function RecentsTabsListItem(props) {
	const { hideURL } = usePopupState();
	const classes = useStyles();

	if (props.tab) {
		const { title, url, sessionId } = props.tab;

		return (
			<ListItem className={classes.listItem} divider={true}>
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

	const { tabs, sessionId } = props.window;

	return (
		<Accordion>
			<AccordionSummary
				className='accordion'
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'>
				<div className={classes.windowAccordion}>
					<Typography className={classes.heading}>
						Window ({tabs.length}
						{tabs.length > 1 ? 'Tabs' : 'Tab'})
					</Typography>

					<Button
						size='small'
						variant='contained'
						color='primary'
						className={classes.button}
						onClick={() => chrome.sessions.restore(sessionId)}>
						Restore
					</Button>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<List
					component='div'
					aria-label='Recently Closed Window'
					className={classes.list}
					key={tabs.url}>
					{tabs.map((tab) => (
						<ListItem className={classes.listItem} divider={true} key={tab.url}>
							<Link
								href='#'
								color='inherit'
								block='true'
								className={`link ${classes.anchor}`}
								underline='none'
								onClick={() => chrome.sessions.restore(tab.sessionId)}>
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
			</AccordionDetails>
		</Accordion>
	);
}

export default RecentsTabsListItem;
