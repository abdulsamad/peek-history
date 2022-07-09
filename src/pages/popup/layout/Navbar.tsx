import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import Search from "./Search";

const Navbar = ({ title }: { title: string }) => (
  <AppBar position="relative" sx={{ height: 60 }}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
      <Search />
    </Toolbar>
  </AppBar>
);

export default Navbar;
