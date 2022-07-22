import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatach } from "../../redux/store";
import { setHideTime } from "../../redux/settings/settings-slice";

const HideTime = ({ value }: { value: boolean }) => {
  const dispatch = useAppDispatach();

  return (
    <SettingItem label="Hide Time">
      <Switch
        checked={value}
        onChange={(ev) => dispatch(setHideTime(ev.target.checked))}
        color="primary"
        inputProps={{ "aria-label": "Hide Time" }}
      />
    </SettingItem>
  );
};

export default HideTime;
