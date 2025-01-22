import React from 'react';
import { AppBar, Toolbar, Typography, Box, FormControlLabel, Switch, useMediaQuery } from '@mui/material';
import { WbSunny, NightlightRound } from '@mui/icons-material';
import TotalTimeDisplay from './TotalTimeDisplay';

const Header = ({ isDarkMode, handleThemeChange, totalHours, totalMinutes, totalDecimal }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 1100,
        padding: '10px 0',
        backgroundColor: isDarkMode ? '#42464E' : '#D6C4A0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant={isMobile ? 'subtitle2' : 'h5'}
          sx={{ color: isDarkMode ? '#ffffff' : '#213547' }}
        >
          TimeTally
        </Typography>

        {/* Time Display */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TotalTimeDisplay
            totalHours={totalHours}
            totalMinutes={totalMinutes}
            totalDecimal={totalDecimal}
            isDarkMode={isDarkMode}
            isMobile={isMobile} // Pass `isMobile` to TotalTimeDisplay
          />
        </Box>

        {/* Light/Dark Mode Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={handleThemeChange}
              icon={<WbSunny sx={{ color: isDarkMode ? '#666' : '#ffd700' }} />}
              checkedIcon={<NightlightRound sx={{ color: '#fff' }} />}
            />
          }
          label={isMobile ? '' : isDarkMode ? 'Dark Mode' : 'Light Mode'}
          sx={{ color: isDarkMode ? '#ffffff' : '#213547' }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
