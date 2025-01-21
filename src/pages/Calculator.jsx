import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography, Box, ThemeProvider, createTheme, Switch, FormControlLabel } from "@mui/material";
import { WbSunny, NightlightRound } from "@mui/icons-material"; 

import TimeEntryGroup from "../components/TimeEntryGroup";
import TotalTimeDisplay from "../components/TotalTimeDisplay";

const Calculator = () => {
  const [entries, setEntries] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light', 
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#d32f2f',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5', 
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#213547', 
      },
    },
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    root.style.backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
    root.style.color = isDarkMode ? '#ffffff' : '#213547';
    body.style.backgroundColor = isDarkMode ? '#121212' : '#f5f5f5'; // Global background change
  }, [isDarkMode]);
  

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { id: Date.now(), start: "", end: "" }]);
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleTimeChange = (id, field, value) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const calculateTotalTime = () => {
    let totalMinutes = 0;

    entries.forEach(({ start, end }) => {
      if (start && end) {
        const [startH, startM] = start.split(":").map(Number);
        const [endH, endM] = end.split(":").map(Number);
        totalMinutes += (endH * 60 + endM) - (startH * 60 + startM);
      }
    });

    return {
      totalHours: Math.floor(totalMinutes / 60),
      totalMinutes: totalMinutes % 60,
    };
  };

  const { totalHours, totalMinutes } = calculateTotalTime();

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ 
        py: 4
        }}>
        {}
        <Box sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={handleThemeChange}
                icon={<WbSunny sx={{ color: 'yellow' }} />}
                checkedIcon={<NightlightRound sx={{ color: '#3f51b5' }} />}
                color="default"
              />
            }
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
            sx={{
              color: isDarkMode ? 'text.primary' : 'text.secondary',
            }}
          />
        </Box>

        <Typography variant="h4" align="center" sx={{ color: 'text.primary' }}>
          Time Calculator
        </Typography>

        <Box sx={{ mb: 4 }}>
          {entries.map(({ id, start, end }) => (
            <TimeEntryGroup
              key={id}
              id={id}
              start={start}
              end={end}
              onStartChange={(value) => handleTimeChange(id, "start", value)}
              onEndChange={(value) => handleTimeChange(id, "end", value)}
              onRemove={handleRemoveEntry}
            />
          ))}
        </Box>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddEntry}>
              Add Entry
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
          <TotalTimeDisplay 
            totalHours={totalHours} 
            totalMinutes={totalMinutes} 
            isDarkMode={isDarkMode} 
          />

          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Calculator;