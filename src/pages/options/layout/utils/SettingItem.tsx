import React from "react";
import {
  Grid,
  Typography,
  FormHelperText,
  SxProps,
  Theme,
  styled,
  Tooltip,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

const StyledGrid = styled(Grid)(() => ({
  margin: "1.5rem 0",
}));

interface ISettingsItem {
  label: string;
  children: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextSX?: SxProps<Theme>;
  info?: string;
}

const SettingItem = ({
  label,
  children,
  helperText,
  helperTextSX,
  info,
}: ISettingsItem) => (
  <StyledGrid alignItems="center" justifyContent="center" container>
    <Grid
      md={6}
      display="flex"
      alignItems="center"
      justifyContent="center"
      item
    >
      <Typography variant="subtitle1" display="flex" alignItems="center">
        {label}
        {info && (
          <Tooltip title={info}>
            <InfoIcon sx={{ margin: "-3px 0 0 6px" }} fontSize="small" />
          </Tooltip>
        )}
      </Typography>
    </Grid>
    <Grid md={4} textAlign="center" item>
      {children}
      {helperText && (
        <FormHelperText
          sx={{
            textAlign: "center",
            marginTop: "6px",
            ...helperTextSX,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Grid>
  </StyledGrid>
);

export default SettingItem;
