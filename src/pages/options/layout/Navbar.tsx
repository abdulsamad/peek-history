import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = ({ title }: { title: string }) => (
  <AppBar position="relative" enableColorOnDark>
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography variant="h4" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
