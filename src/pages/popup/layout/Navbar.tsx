import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import Search from "./Search";

const Navbar = ({ title }: { title: string }) => {
  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <Search />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
