import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const HideTime = () => {
  return (
    <SettingItem label="Hide Time">
      <Switch
        // checked={value}
        // onChange={onChange}
        color="primary"
        inputProps={{ "aria-label": "Hide Time" }}
      />
    </SettingItem>
  );
};

export default HideTime;
