import React, { useState, useLayoutEffect } from "react";
import {
  Autocomplete,
  createFilterOptions,
  Typography,
  TextField,
} from "@mui/material";

import SettingItem from "../utils/SettingItem";

const Font = () => {
  const [fontList, setFontList] = useState<chrome.fontSettings.FontName[]>([]);
  const [inputVal, setInputVal] = useState("");

  useLayoutEffect(() => {
    // Get all system fonts
    chrome.fontSettings.getFontList((fonts) => setFontList(fonts));
  }, []);

  return (
    <SettingItem
      label="Font"
      helperText={
        <>
          <strong>Note:</strong> Font should be installed on the computer.
        </>
      }
    >
      <Autocomplete
        size="small"
        options={fontList}
        getOptionLabel={(option) => option.displayName}
        inputValue={inputVal}
        onInputChange={(ev, value) => setInputVal(value)}
        // onChange={onChange}
        blurOnSelect={true}
        clearOnBlur={false}
        noOptionsText="No Fonts Available"
        filterOptions={createFilterOptions({ limit: 5 })}
        renderOption={(element, option) => (
          <Typography
            variant="body1"
            style={{ fontFamily: option.displayName }}
          >
            {option.displayName}
          </Typography>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Enter Font Name" variant="filled" />
        )}
      />
    </SettingItem>
  );
};

export default Font;
