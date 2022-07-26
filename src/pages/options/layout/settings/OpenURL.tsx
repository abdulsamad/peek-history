import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setOpenURL } from "../../../../commons/redux/settings/settings-slice";

const OpenURL = ({
  value,
}: {
  value: "new-tab" | "current-tab" | "background-tab";
}) => {
  const dispatch = useAppDispatch();

  return (
    <SettingItem label="Open URL in">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select
          value={value}
          onChange={(ev) => {
            // Typecase to prevent typescript error
            const newValue = ev.target.value as
              | "new-tab"
              | "current-tab"
              | "background-tab";

            dispatch(setOpenURL(newValue));
          }}
        >
          <MenuItem value="new-tab">Open in a New Tab</MenuItem>
          <MenuItem value="current-tab">Open in current tab</MenuItem>
          <MenuItem value="background-tab">Open in new background tab</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default OpenURL;
