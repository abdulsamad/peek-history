import React from 'react';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
	makeStyles,
	List,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@material-ui/core/';
import { usePopupState } from '../../../context/popupContext';
import RecentsTabsListItem from './RecentsTabsListItem';
import OtherTabsListItem from './OtherTabsListItem';

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

function TabsList() {
	const { recentTabs, otherTabs } = usePopupState();
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					className='accordion'
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<Typography className={classes.heading}>Recently Closed Tabs</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List component='div' aria-label='Recently Closed Tabs' className={classes.list}>
						{recentTabs.map((tab, index) => (
							<RecentsTabsListItem
								{...tab}
								key={tab.tab ? tab.lastModified * index : tab.window.sessionId * index}
							/>
						))}
					</List>
				</AccordionDetails>
			</Accordion>

			{otherTabs.map((device) => (
				<Accordion key={device.deviceName}>
					<AccordionSummary
						className='accordion'
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<Typography className={classes.heading}>{device.deviceName}</Typography>
					</AccordionSummary>
					<AccordionDetails className={classes.accordionDetails}>
						<List component='div' aria-label='Recently Closed Tabs' className={classes.list}>
							{device.sessions.map((dev) => (
								<OtherTabsListItem {...dev} key={dev.window.sessionId} />
							))}
						</List>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
}

export default TabsList;
