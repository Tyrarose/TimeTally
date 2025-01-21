import React from "react";
import { Grid, Button, Box } from "@mui/material";
import TimeSelection from "./TimeSelection";

const TimeEntryGroup = ({ id, start, end, onStartChange, onEndChange, onRemove, isDarkMode }) => {
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
          <Button variant="outlined" color="error" onClick={() => onRemove(id)} fullWidth>
            Remove
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeEntryGroup;
