import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const InfiniteScroll = () => {
  return (
    <SettingItem label="Infinite Scroll">
      <Switch
        // checked={value}
        // onChange={onChange}
        color="primary"
        inputProps={{ "aria-label": "infiniteScroll" }}
      />
    </SettingItem>
  );
};

export default InfiniteScroll;
