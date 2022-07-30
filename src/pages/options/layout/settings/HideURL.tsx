import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setHideURL } from "../../../../commons/redux/settings/settings-slice";

const HideURL = ({ value }: { value: boolean }) => {
  const dispatch = useAppDispatch();

  return (
    <SettingItem label="Hide URL">
      <Switch
        checked={value}
        onChange={(ev) => dispatch(setHideURL(ev.target.checked))}
        color="primary"
        inputProps={{ "aria-label": "Hide URL's" }}
      />
    </SettingItem>
  );
};

export default HideURL;
