import React from "react";
import { Typography } from "@mui/material";

const TotalTimeDisplay = ({ totalHours, totalMinutes, isDarkMode }) => (
  <Typography variant="h6" sx={{ color: isDarkMode ? '#ffffff' : '#213547' }}>
    Total Time: {totalHours}h {totalMinutes}m
  </Typography>
);

export default TotalTimeDisplay;
