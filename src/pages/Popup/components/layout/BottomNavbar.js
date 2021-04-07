import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
	Home as HomeIcon,
	Devices as DevicesIcon,
	Settings as SettingsIcon,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import { usePopupState, usePopupDispatch } from '../../context/popupContext';
import DeleteAllModal from '../home/history/DeleteAllModal';

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
	const { activeTabNum, loading } = usePopupState();
	const { setActiveTabNum } = usePopupDispatch();
	const classes = useStyles();

	return (
		<nav className={classes.nav}>
			{loading ? (
				<BottomNavigation className={classes.root}>
					<BottomNavigationAction icon={<Skeleton variant='circle' width={24} height={24} />} />
					<BottomNavigationAction icon={<Skeleton variant='circle' width={24} height={24} />} />
					<BottomNavigationAction icon={<Skeleton variant='circle' width={24} height={24} />} />
					<BottomNavigationAction icon={<Skeleton variant='circle' width={24} height={24} />} />
				</BottomNavigation>
			) : (
				<BottomNavigation
					className={classes.root}
					onChange={(event, newValue) => setActiveTabNum(newValue)}
					value={activeTabNum}>
					<BottomNavigationAction className='home' icon={<HomeIcon />} />
					<BottomNavigationAction className='tabs' icon={<DevicesIcon />} />
					<DeleteAllModal />
					<BottomNavigationAction
						className='options'
						onClick={() => chrome.runtime.openOptionsPage()}
						icon={<SettingsIcon />}
					/>
				</BottomNavigation>
			)}
		</nav>
	);
}

export default BottomNavbar;
