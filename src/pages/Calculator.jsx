import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Grid, Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import dayjs from "dayjs";
import TimeEntryGroup from "../components/TimeEntryGroup";
import TotalTimeDisplay from "../components/TotalTimeDisplay";

const Calculator = ({ isDarkMode, updateTotalTime }) => {
  const [entries, setEntries] = useState([]);
  const lastEntryRef = useRef(null);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: {
        default: isDarkMode ? "#42464E" : "#D6C4A0",
        paper: isDarkMode ? "#D6C4A0" : "#42464E",
      },
      text: {
        primary: isDarkMode ? "#d0d6f2" : "#4a4a4a",
        secondary: isDarkMode ? "#a0a0a0" : "#666666",
      },
      primary: {
        main: isDarkMode ? "#281964" : "#E3B35A",
      },
    },
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleAddEntry = () => {
    const now = dayjs();
    const newEntry = {
      id: Date.now(),
      start: now,
      end: now.add(1, "hour"),
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);

    setTimeout(() => {
      lastEntryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleRemoveAllEntries = () => {
    setEntries([]); // Clear all entries
  };

  const handleTimeChange = (id, field, value) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value || dayjs() } : entry
      )
    );
  };

  const calculateTotalTime = () => {
    let totalMinutes = 0;
    entries.forEach(({ start, end }) => {
      if (start || end) {
        const startTime = start || dayjs();
        const endTime = end || dayjs();
        const startMinutes = startTime.hour() * 60 + startTime.minute();
        const endMinutes = endTime.hour() * 60 + endTime.minute();
        let diffMinutes = endMinutes - startMinutes;
        if (diffMinutes < 0) {
          diffMinutes += 24 * 60;
        }
        totalMinutes += diffMinutes;
      }
    });
    return {
      totalHours: Math.floor(Math.max(0, totalMinutes) / 60),
      totalMinutes: Math.max(0, totalMinutes) % 60,
    };
  };

  useEffect(() => {
    const { totalHours, totalMinutes } = calculateTotalTime();
    updateTotalTime(totalHours, totalMinutes);
  }, [entries, updateTotalTime]);

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
          minHeight: "100vh",
        }}
      >
        <Box sx={{ mb: 4 }}>
          {entries.map(({ id, start, end }, index) => (
            <div
              key={id}
              ref={index === entries.length - 1 ? lastEntryRef : null}
            >
              <TimeEntryGroup
                id={id}
                start={start}
                end={end}
                onStartChange={(value) => handleTimeChange(id, "start", value)}
                onEndChange={(value) => handleTimeChange(id, "end", value)}
                onRemove={handleRemoveEntry}
                isDarkMode={isDarkMode}
              />
            </div>
          ))}
        </Box>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddEntry}>
              Add Entry
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={handleRemoveAllEntries}
              disabled={entries.length === 0}
            >
              Remove All
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
