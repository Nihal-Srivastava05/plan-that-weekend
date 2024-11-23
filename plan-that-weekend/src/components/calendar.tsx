import React from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { Box, Grid, Typography, Tooltip } from "@mui/material";

const StaticCalendar = ({ longweekends, year = 2024, month = 1 }) => {
  const longWeekends = longweekends.map(([start, end]) => ({
    start: new Date(start),
    end: new Date(end),
  }));
  // Get all days of the month
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  const days = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Check if a day belongs to a long weekend
  const isLongWeekend = (date) =>
    longWeekends.some(({ start, end }) => date >= start && date <= end);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {format(firstDayOfMonth, "MMMM yyyy")}
      </Typography>
      <Grid container spacing={1}>
        {/* Render day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Grid item xs={1.7} key={day} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1}>
        {/* Render blank spaces before the first day of the month */}
        {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
          <Grid item xs={1.7} key={`blank-${index}`} />
        ))}

        {/* Render days */}
        {days.map((day) => (
          <Grid
            item
            xs={1.7}
            key={day.toISOString()}
            sx={{ textAlign: "center" }}
          >
            {isLongWeekend(day) ? (
              <Tooltip title="Long Weekend" arrow>
                <Box
                  sx={{
                    bgcolor: "#fdd835", // Highlighted background for long weekends
                    color: "white",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {format(day, "d")}
                </Box>
              </Tooltip>
            ) : (
              <Typography>{format(day, "d")}</Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StaticCalendar;
