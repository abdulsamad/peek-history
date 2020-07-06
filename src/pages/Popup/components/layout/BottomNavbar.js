import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import DevicesIcon from '@material-ui/icons/Devices';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteAllModal from '../home/DeleteAllModal';

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
  const [value, setValue] = React.useState(0);

  return (
    <nav className={classes.nav}>
      {value === 2 && <DeleteAllModal />}

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
        // showLabels={false}
        className={classes.root}
      >
        <BottomNavigationAction icon={<HomeIcon />} />
        <BottomNavigationAction icon={<DevicesIcon />} />
        <BottomNavigationAction icon={<DeleteForeverIcon />} />
        <BottomNavigationAction icon={<SettingsIcon />} />
      </BottomNavigation>
    </nav>
  );
}

export default BottomNavbar;
