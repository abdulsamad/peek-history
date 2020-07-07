import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import DevicesIcon from '@material-ui/icons/Devices';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteAllModal from '../home/history/DeleteAllModal';
import PopupContext from '../../context/popupContext';

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
  const classes = useStyles();
  const popupContext = useContext(PopupContext);
  const { activeTabNum, setActiveTabNum } = popupContext;

  return (
    <nav className={classes.nav}>
      <BottomNavigation
        value={activeTabNum}
        onChange={(event, newValue) => {
          setActiveTabNum(newValue);
        }}
        className={classes.root}
      >
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
