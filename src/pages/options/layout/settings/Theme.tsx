import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const Theme = () => {
  return (
    <SettingItem
      label="Theme"
      helperText="Default will be set according to your system preference."
    >
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select
          value={"default"}
          // onChange={handleChange}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="light">Light</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default Theme;
