import React from "react";
import {
  Grid,
  Typography,
  FormHelperText,
  SxProps,
  Theme,
} from "@mui/material";

interface ISettingsItem {
  label: string;
  children: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextSX?: SxProps<Theme>;
}

const SettingItem = ({
  label,
  children,
  helperText,
  helperTextSX,
}: ISettingsItem) => {
  return (
    <Grid alignItems="center" container>
      <Grid item md={6}>
        <Typography variant="subtitle1" align="center">
          {label}
        </Typography>
      </Grid>
      <Grid item md={4}>
        {children}
        {helperText && (
          <FormHelperText sx={helperTextSX}>{helperText}</FormHelperText>
        )}
      </Grid>
    </Grid>
  );
};

export default SettingItem;
