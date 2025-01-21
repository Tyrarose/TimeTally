import React from 'react';
import { AppBar, Toolbar, Typography, Box, FormControlLabel, Switch } from '@mui/material';
import { WbSunny, NightlightRound } from '@mui/icons-material';
import TotalTimeDisplay from './TotalTimeDisplay';

const Header = ({ isDarkMode, handleThemeChange, totalHours, totalMinutes }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 1100, // Ensure the header is above other elements
        padding: '10px 0',
        backgroundColor: isDarkMode ? '#42464E' : '#D6C4A0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Time Tally
        </Typography>
        
        {/* Time Display */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TotalTimeDisplay totalHours={totalHours} totalMinutes={totalMinutes} isDarkMode={isDarkMode} />
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
          label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
          sx={{ color: 'text.primary' }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
