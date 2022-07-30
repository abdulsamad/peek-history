import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setHideTime } from "../../../../commons/redux/settings/settings-slice";

const HideTime = ({ value }: { value: boolean }) => {
  const dispatch = useAppDispatch();

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
