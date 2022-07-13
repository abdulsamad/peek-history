import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const Sort = () => {
  return (
    <SettingItem label="Sort By">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Select value={"last-visit"} onChange={() => null}>
          <MenuItem value="last-visit">By Last Visit</MenuItem>
          <MenuItem value="most-visit">By Most Visit</MenuItem>
        </Select>
      </FormControl>
    </SettingItem>
  );
};

export default Sort;
