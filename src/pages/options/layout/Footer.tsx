import React from "react";
import { Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Container component="footer" sx={{ textAlign: "center" }}>
      <Typography variant="subtitle1">
        Please leave a positive rating on the{" "}
        <Link underline="none" href={import.meta.env.VITE_EXTENSION_URL}>
          Chrome Web Store
        </Link>
        &#44; If you like this extension and leave a feedback.
      </Typography>
    </Container>
  );
};

export default Footer;
