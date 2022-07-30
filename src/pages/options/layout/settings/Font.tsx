import React, { useState, useLayoutEffect } from "react";
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setFont } from "../../../../commons/redux/settings/settings-slice";

const Font = ({ value }: { value: string }) => {
  const [fontList, setFontList] = useState<chrome.fontSettings.FontName[]>([]);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // Get all system fonts
    chrome.fontSettings.getFontList((fonts) => setFontList(fonts));
  }, []);

  if (fontList.length === 0) return null;

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
        options={fontList}
        getOptionLabel={(option) => option.displayName}
        filterOptions={createFilterOptions({ limit: 5 })}
        defaultValue={
          fontList.filter(({ displayName }) => displayName === value)[0]
        }
        onBlur={(ev) => {
          const newValue = (ev.target as HTMLInputElement).value;

          if (
            fontList.find(({ displayName }) => displayName === newValue) ||
            newValue === ""
          ) {
            dispatch(setFont(newValue));
            return;
          }

          setError(true);
        }}
        onChange={(ev, newValue) => {
          if (!newValue) return null;

          // Update font
          dispatch(setFont(newValue.displayName));
        }}
        renderInput={(params) => (
          <TextField label="Enter Font Name" {...params} />
        )}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
        autoHideDuration={3000}
        onClose={(ev, reason) => {
          if (reason === "timeout") setError(false);
        }}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{ marginTop: "30px", width: "100%" }}
        >
          Font is not installed on your device.
        </Alert>
      </Snackbar>
    </SettingItem>
  );
};

export default Font;
