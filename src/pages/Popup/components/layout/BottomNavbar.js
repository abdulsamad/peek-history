import React from 'react';
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
	Home as HomeIcon,
	Devices as DevicesIcon,
	Settings as SettingsIcon,
} from '@material-ui/icons';
import DeleteAllModal from '../home/history/DeleteAllModal';
import { usePopupState, usePopupDispatch } from '../../context/popupContext';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		height: 60,
		width: '100%',
		position: 'fixed',
		bottom: 0,
		left: 0,
		boxShadow: `
      0 14px 28px rgba(0,0,0,0.25), 0 16px 10px rgba(0,0,0,0.22),
      0 14px 28px rgba(0,0,0,0.25), 0 16px 10px rgba(0,0,0,0.22)
    `,
	},
	nav: {
		width: '100%',
	},
});

function BottomNavbar() {
	const { activeTabNum } = usePopupState();
	const { setActiveTabNum } = usePopupDispatch();
	const classes = useStyles();

	return (
		<nav className={classes.nav}>
			<BottomNavigation
				value={activeTabNum}
				onChange={(event, newValue) => {
					setActiveTabNum(newValue);
				}}
				className={classes.root}>
				<BottomNavigationAction icon={<HomeIcon />} />
				<BottomNavigationAction icon={<DevicesIcon />} />
				<DeleteAllModal />
				<BottomNavigationAction
					onClick={() => chrome.runtime.openOptionsPage()}
					icon={<SettingsIcon />}
				/>
			</BottomNavigation>
		</nav>
	);
}

export default BottomNavbar;
