import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setAccentFont } from "../../../../commons/redux/settings/settings-slice";

const AccentFont = ({ value }: { value: string }) => {
  const dispatch = useAppDispatch();

  return (
    <SettingItem
      label="Accent Font Color"
      info="Font color on elements that have accent background. Such as Navbar, Buttons, etc."
    >
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select
          value={value}
          onChange={(ev) => dispatch(setAccentFont(ev.target.value))}
        >
          <MenuItem value="#f5f5f5">Light</MenuItem>
          <MenuItem value="#2f2f2f">Dark</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default AccentFont;
