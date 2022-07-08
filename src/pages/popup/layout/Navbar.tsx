import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { RootState } from "../redux/store";

const Navbar = ({ title }: { title: string }) => {
  const state = useSelector((state: RootState) => state);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
