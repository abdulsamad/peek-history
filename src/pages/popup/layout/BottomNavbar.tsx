import React from "react";
import { useSelector } from "react-redux";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Settings as SettingsIcon,
  Home as HomeIcon,
  Devices as DevicesIcon,
} from "@mui/icons-material";

import { RootState, useAppDispatch } from "../redux/store";
import { switchActiveView } from "../redux/ui/ui-slice";
import DeleteMultiple from "./history/DeleteMultiple";

const BottomNavbar = () => {
  const UI = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  return (
    <Paper>
      <BottomNavigation
        onChange={(event, newValue) => {
          // Because there are only 2 views History and Tabs. Delete and Settings icon are only for actions.
          if (newValue > 1) return;

          dispatch(switchActiveView(newValue));
        }}
        value={UI.active}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Tabs" icon={<DevicesIcon />} />
        <BottomNavigationAction
          label="Delete"
          icon={<DeleteMultiple />}
          sx={{ padding: 0 }}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
          onClick={() => chrome.runtime.openOptionsPage()}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
