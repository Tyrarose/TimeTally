import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { Box, Grid } from "@mui/material";

export default function TimeSelection({ label, value, onChange }) {
  const [selectedTime, setSelectedTime] = React.useState(value || dayjs());

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    onChange(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Grid container spacing={2} alignItems="center">
          {/* TimeClock visible on large screens and hidden on mobile */}
          <Grid item xs={12} sx={{ display: { xs: "none", md: "block" } }}>
            <TimeClock value={selectedTime} onChange={handleTimeChange} ampm />
          </Grid>
          {/* TimeField */}
          <Grid item xs={12}>
            <TimeField
              label={label}
              value={selectedTime}
              onChange={handleTimeChange}
              format="hh:mm a"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
