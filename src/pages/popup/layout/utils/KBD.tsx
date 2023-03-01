import React from "react";
import { Typography } from "@mui/material";

const KBD = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      component="kbd"
      display="inline-block"
      borderRadius="4px"
      color="initial"
      boxShadow="0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset"
      border="1px solid #ccc"
      padding="0 0.5em"
      margin="0 0.2em"
      sx={{ backgroundColor: "#f7f7f7" }}
    >
      {children}
    </Typography>
  );
};

export default KBD;
