import React from "react";
import { FormControl, Slider } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const PopupWidth = () => {
  return (
    <SettingItem label="Popup Width" helperText="Default value is 400.">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Slider
          aria-labelledby="popup-width-slider"
          min={250}
          max={700}
          step={10}
          value={400}
          onChange={() => null}
          valueLabelDisplay="auto"
        />
      </FormControl>
    </SettingItem>
  );
};

export default PopupWidth;
