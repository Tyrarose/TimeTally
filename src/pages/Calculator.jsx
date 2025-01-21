import React, { useState, useEffect } from "react";
import { 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Box, 
  ThemeProvider, 
  createTheme, 
  Switch, 
  FormControlLabel,
  CssBaseline
} from "@mui/material";
import { WbSunny, NightlightRound } from "@mui/icons-material";
import TimeEntryGroup from "../components/TimeEntryGroup";
import TotalTimeDisplay from "../components/TotalTimeDisplay";

const Calculator = () => {
  const [entries, setEntries] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#42464E' : '#D6C4A0', 
        paper: isDarkMode ? '#D6C4A0' : '#42464E', 
      },
      text: {
        primary: isDarkMode ? '#d0d6f2' : '#4a4a4a', 
        secondary: isDarkMode ? '#a0a0a0' : '#666666', 
      },
      primary: {
        main: isDarkMode ? '#281964' : '#E3B35A', 
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDarkMode ? '#42464E' : '#D6C4A0',
            color: isDarkMode ? '#d0d6f2' : '#4a4a4a',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2b3a6b' : '#f3f1d7',
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d3b6e' : '#fff8e1', 
          }
        }
      }
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
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
        const startTime = typeof start === 'string' ? start : start.format('HH:mm');
        const endTime = typeof end === 'string' ? end : end.format('HH:mm');
        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);
        totalMinutes += (endH * 60 + endM) - (startH * 60 + startM);
      }
    });
    return {
      totalHours: Math.floor(Math.max(0, totalMinutes) / 60),
      totalMinutes: Math.max(0, totalMinutes) % 60,
    };
  };

  const { totalHours, totalMinutes } = calculateTotalTime();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center", 
          flexDirection: "column", 
          minHeight: "100vh", // Full height of the viewport
          py: 4,
        }}
      >
        {/* Dark/Light mode switch */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={handleThemeChange}
                icon={<WbSunny sx={{ color: theme.palette.mode === 'dark' ? '#666' : '#ffd700' }} />}
                checkedIcon={<NightlightRound sx={{ color: '#fff' }} />}
              />
            }
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
          />
        </Box>

        <Typography 
          variant="h4" 
          align="center" 
          sx={{ mb: 4, color: 'text.primary' }}
        >
          Time Tally
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
              isDarkMode={isDarkMode}
            />
          ))}
        </Box>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddEntry}
              sx={{
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
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
