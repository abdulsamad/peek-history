import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const OpenURL = () => {
  return (
    <SettingItem label="Open URL in">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select value={""} onChange={() => null}>
          <MenuItem value="">Open in a New Tab</MenuItem>
          <MenuItem value="">Open in current tab</MenuItem>
          <MenuItem value="">Open in new background tab</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default OpenURL;
