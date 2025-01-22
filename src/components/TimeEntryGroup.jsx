import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import TimeSelection from "./TimeSelection";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";

const TimeEntryGroup = ({ id, start, end, onStartChange, onEndChange, onRemove, isDarkMode }) => {
  const calculateTimeDifference = (start, end) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);

    let diffMinutes = endTime.diff(startTime, "minute");
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60; // Handle crossing midnight
    }

    const totalHours = Math.floor(diffMinutes / 60);
    const totalMinutes = diffMinutes % 60;
    const totalDecimal = (diffMinutes / 60).toFixed(2);

    return { totalHours, totalMinutes, totalDecimal };
  };

  const { totalHours, totalMinutes, totalDecimal } = calculateTimeDifference(start, end);

  return (
    <Box
      sx={{
        mb: 2,
        border: "1px solid",
        borderRadius: 3,
        margin: "30px 0",
        padding: "30px",
        boxShadow: 3,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TimeSelection
            label="Start Time"
            value={start}
            onChange={onStartChange}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TimeSelection
            label="End Time"
            value={end}
            onChange={onEndChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" color={isDarkMode ? "text.primary" : "text.secondary"} sx={{ mb: 2 }}>
            Duration: {totalHours}h {totalMinutes}m
          </Typography>
          <Typography variant="body1" color={isDarkMode ? "text.primary" : "text.secondary"} sx={{ mb: 2 }}>
            Decimal: {totalDecimal} 
          </Typography>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onRemove(id)} fullWidth>
            Remove
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeEntryGroup;
