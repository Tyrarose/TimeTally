import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ py: 2, backgroundColor: "#42464E", textAlign: "center" }}>
      <Typography sx={{ color: "#fff" }}>
        &copy; {currentYear} | Developed by{" "}
        <Link
          href="https://www.tyragenerose.top/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#90caf9", textDecoration: "none", fontWeight: "bold" }}
        >
          Generosiie
        </Link>
      </Typography>
      <Typography sx={{ color: "#fff", fontSize: "0.8rem" }}>
        All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
