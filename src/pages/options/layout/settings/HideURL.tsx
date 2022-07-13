import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const HideURL = () => {
  return (
    <SettingItem label="Hide URL">
      <Switch
        // checked={value}
        // onChange={onChange}
        color="primary"
        inputProps={{ "aria-label": "Hide URL's" }}
      />
    </SettingItem>
  );
};

export default HideURL;
