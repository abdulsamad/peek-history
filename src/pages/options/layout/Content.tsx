import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

import Theme from "./settings/Theme";
import Font from "./settings/Font";
import Accent from "./settings/Accent";
import PopupWidth from "./settings/PopupWidth";
import HideURL from "./settings/HideURL";
import Sort from "./settings/Sort";
import InfiniteScroll from "./settings/InfiniteScroll";
import OpenURL from "./settings/OpenURL";
import HideTime from "./settings/HideTime";

const Content = () => {
  return (
    <Container sx={{ margin: "1rem" }}>
      <Paper sx={{ padding: "1rem 3rem" }} elevation={4}>
        <Typography
          variant="h6"
          display="flex"
          alignItems="center"
          gutterBottom
        >
          <SettingsIcon sx={{ marginRight: "5px" }} />
          Settings
        </Typography>
        <Theme />
        <Font />
        <Accent />
        <PopupWidth />
        <HideURL />
        <Sort />
        <InfiniteScroll />
        <OpenURL />
        <HideTime />
      </Paper>
    </Container>
  );
};

export default Content;
