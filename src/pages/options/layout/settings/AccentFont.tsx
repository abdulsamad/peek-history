import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const AccentFont = () => {
  return (
    <SettingItem label="Accent Font Color">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select value={"#f5f5f5"} onChange={() => null}>
          <MenuItem value="#f5f5f5">Light</MenuItem>
          <MenuItem value="#2f2f2f">Dark</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default AccentFont;
