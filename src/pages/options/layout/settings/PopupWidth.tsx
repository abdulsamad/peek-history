import React from "react";
import { FormControl, Slider } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setPopupWidth } from "../../../../commons/redux/settings/settings-slice";

const PopupWidth = ({ value }: { value: number }) => {
  const dispatch = useAppDispatch();

  return (
    <SettingItem label="Popup Width" helperText="Default value is 400.">
      <FormControl sx={{ width: "100%" }} hiddenLabel={true}>
        <Slider
          aria-labelledby="popup-width-slider"
          min={250}
          max={700}
          step={5}
          value={value}
          onChange={(ev, newValue) =>
            dispatch(setPopupWidth(newValue as number))
          }
          valueLabelDisplay="auto"
        />
      </FormControl>
    </SettingItem>
  );
};

export default PopupWidth;
