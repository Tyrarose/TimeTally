import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

const TotalTimeDisplay = ({ totalHours, totalMinutes, totalDecimal, isDarkMode, isMobile }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile, side by side on larger screens
      justifyContent: 'center', // Centers the content horizontally
      textAlign: 'center', // Centers the text horizontally
    }}
  >
    <Typography
      variant={isMobile ? 'subtitle1' : 'h6'}
      sx={{ color: isDarkMode ? '#ffffff' : '#213547', marginRight: isMobile ? '0' : '22px' }}
    >
      Total: {totalHours}h {totalMinutes}m
    </Typography>
    <Typography
      variant={isMobile ? 'subtitle1' : 'h6'}
      sx={{ color: isDarkMode ? '#ffffff' : '#213547' }}
    >
      Decimal: ({totalDecimal})
    </Typography>
  </Box>
);

export default TotalTimeDisplay;
