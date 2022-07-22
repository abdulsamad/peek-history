import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatach } from "../../redux/store";
import { setSort } from "../../redux/settings/settings-slice";

const Sort = ({ value }: { value: "last-visit" | "most-visit" }) => {
  const dispatch = useAppDispatach();

  return (
    <SettingItem label="Sort By">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select
          value={value}
          onChange={(ev) => {
            // Typecase to prevent typescript error
            const newValue = ev.target.value as "last-visit" | "most-visit";

            dispatch(setSort(newValue));
          }}
        >
          <MenuItem value="last-visit">By Last Visit</MenuItem>
          <MenuItem value="most-visit">By Most Visit</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default Sort;
