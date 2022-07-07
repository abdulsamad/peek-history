import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Skeleton,
  Paper,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Home as HomeIcon,
  Devices as DevicesIcon,
} from "@mui/icons-material";

const BottomNavbar = () => {
  // if (loading) {
  //   return (
  //     <BottomNavigation>
  //       <BottomNavigationAction
  //         icon={<Skeleton variant="circular" width={24} height={24} />}
  //       />
  //       <BottomNavigationAction
  //         icon={<Skeleton variant="circular" width={24} height={24} />}
  //       />
  //       <BottomNavigationAction
  //         icon={<Skeleton variant="circular" width={24} height={24} />}
  //       />
  //       <BottomNavigationAction
  //         icon={<Skeleton variant="circular" width={24} height={24} />}
  //       />
  //     </BottomNavigation>
  //   );
  // }

  return (
    <Paper>
      <BottomNavigation
        // onChange={(event, newValue) => setActiveTabNum(newValue)}
        value={0}
      >
        <BottomNavigationAction className="home" icon={<HomeIcon />} />
        <BottomNavigationAction className="tabs" icon={<DevicesIcon />} />
        <BottomNavigationAction className="tabs" icon={<DevicesIcon />} />
        <BottomNavigationAction
          className="options"
          onClick={() => chrome.runtime.openOptionsPage()}
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
