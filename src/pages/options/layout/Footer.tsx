import React from "react";
import { Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Container component="footer" sx={{ textAlign: "center" }}>
      <Typography variant="subtitle1">
        Please leave a positive rating on the{" "}
        <Link
          underline="none"
          href="https://chrome.google.com/webstore/detail/peek-history/gknodemjjckmkncijnedcpogffimkmbm?from=options"
        >
          Chrome Web Store,
        </Link>{" "}
        If you like this extension and leave a feedback.
      </Typography>
    </Container>
  );
};

export default Footer;
