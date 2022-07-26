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
import AccentFont from "./settings/AccentFont";
import { ISettings } from "../../../commons/redux/settings/defaults";

const Content = ({ settings }: { settings: ISettings }) => (
  <Container sx={{ margin: "1rem auto" }}>
    <Paper sx={{ padding: "1rem 3rem" }} elevation={4}>
      <Typography variant="h6" display="flex" alignItems="center" gutterBottom>
        <SettingsIcon sx={{ marginRight: "5px" }} />
        Settings
      </Typography>
      <Theme value={settings.theme} />
      <Font value={settings.font} />
      <Accent value={settings.accent} />
      <AccentFont value={settings.accentFont} />
      <PopupWidth value={settings.popupWidth} />
      <HideURL value={settings.hideURL} />
      <Sort value={settings.sort} />
      <InfiniteScroll value={settings.infinite} />
      <OpenURL value={settings.openURL} />
      <HideTime value={settings.hideTime} />
    </Paper>
  </Container>
);

export default Content;
