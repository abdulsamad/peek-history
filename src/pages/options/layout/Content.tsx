import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

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
      </Paper>
    </Container>
  );
};

export default Content;
