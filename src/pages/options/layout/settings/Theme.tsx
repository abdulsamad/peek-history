import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import { useAppDispatch } from "../../redux/store";
import { setTheme } from "../../../../commons/redux/settings/settings-slice";
import SettingItem from "../utils/SettingItem";

const Theme = ({ value }: { value: "default" | "dark" | "light" }) => {
  const dispatch = useAppDispatch();

  return (
    <SettingItem
      label="Theme"
      helperText="Default will be set according to your system preference."
    >
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select
          value={value}
          onChange={(ev) => {
            // Typecase to prevent typescript error
            const newValue = ev.target.value as "default" | "dark" | "light";

            dispatch(setTheme(newValue));
          }}
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
