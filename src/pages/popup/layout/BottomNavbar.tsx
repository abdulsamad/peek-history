import React from "react";
import { useSelector } from "react-redux";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Settings as SettingsIcon,
  Home as HomeIcon,
  Devices as DevicesIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";

import { RootState, useAppDispatach } from "../redux/store";
import { switchActiveView } from "../redux/ui/ui-slice";

const BottomNavbar = () => {
  const { active } = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatach();

  return (
    <Paper>
      <BottomNavigation
        onChange={(event, newValue) => {
          // Because there are only 2 views History and Tabs. Delete and Settings icon are only for actions.
          if (newValue > 1) return;

          dispatch(switchActiveView(newValue));
        }}
        value={active}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Tabs" icon={<DevicesIcon />} />
        <BottomNavigationAction label="Delete" icon={<DeleteForeverIcon />} />
        <BottomNavigationAction
          label="Settings"
          onClick={() => chrome.runtime.openOptionsPage()}
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
