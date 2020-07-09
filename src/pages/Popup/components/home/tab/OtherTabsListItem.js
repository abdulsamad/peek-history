import React, { Fragment } from 'react';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
	makeStyles,
	ListItem,
	ListItemText,
	ListItemIcon,
	Avatar,
	Divider,
	Typography,
	List,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Link,
	Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	list: {
		width: '100%',
		padding: 0,
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
	},
}));

function RecentsTabsListItem(props) {
	const classes = useStyles();

	const { tabs, sessionId } = props.window;

	if (tabs.length === 1) {
		return (
			<>
				<List
					component='div'
					aria-label='Recently Closed Window'
					className={classes.list}
					key={tabs.url}>
					{tabs.map((tab) => (
						<Fragment key={tab.url}>
							<ListItem className={classes.root}>
								<Link
									href='#'
									color='inherit'
									block='true'
									onClick={() => chrome.sessions.restore(tab.sessionId)}
									className={classes.anchor}
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
										secondary={tab.url}
										secondaryTypographyProps={{ title: tab.url }}
									/>
								</Link>
							</ListItem>
							<Divider />
						</Fragment>
					))}
				</List>
				<Divider />
			</>
		);
	}

	return (
		<>
			<Accordion>
				<AccordionSummary
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
							<Fragment key={tab.url}>
								<ListItem className={classes.root}>
									<Link
										href='#'
										color='inherit'
										block='true'
										onClick={() => chrome.sessions.restore(tab.sessionId)}
										className={classes.anchor}
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
											secondary={tab.url}
											secondaryTypographyProps={{ title: tab.url }}
										/>
									</Link>
								</ListItem>
								<Divider />
							</Fragment>
						))}
					</List>
				</AccordionDetails>
			</Accordion>
			<Divider />
		</>
	);
}

export default RecentsTabsListItem;
