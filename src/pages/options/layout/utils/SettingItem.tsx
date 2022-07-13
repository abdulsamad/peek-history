import React from "react";
import {
  Grid,
  Typography,
  FormHelperText,
  SxProps,
  Theme,
  styled,
} from "@mui/material";

const StyledGrid = styled(Grid)(() => ({
  margin: "1.5rem 0",
}));

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
}: ISettingsItem) => (
  <StyledGrid alignItems="center" justifyContent="center" container>
    <Grid md={6} item>
      <Typography variant="subtitle1" align="center">
        {label}
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
