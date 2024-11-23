import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import { isWithinInterval, isSameDay } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const HighlightedDateCalendar = () => {
  // Define a date range
  const startDate = new Date(2024, 1, 5); // Jan 5, 2024
  const endDate = new Date(2024, 1, 15); // Jan 15, 2024

  // Highlight logic using custom day slot props
  const getDayStyles = (date) => {
    const isInRange = isWithinInterval(date, {
      start: startDate,
      end: endDate,
    });
    const isStart = isSameDay(date, startDate);
    const isEnd = isSameDay(date, endDate);

    if (isInRange) {
      console.log("gone in");
      return {
        backgroundColor: "#fdd835", // Highlighted background
        color: "black",
        ...(isStart && {
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
        }),
        ...(isEnd && {
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
        }),
      };
    }
    return {};
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <DateCalendar
          slots={{
            day: ({ day, selected, onDaySelect, outsideCurrentMonth }) => {
              const dayStyles = getDayStyles(day);

              return (
                <Box
                  onClick={() => onDaySelect(day)}
                  sx={{
                    width: 36,
                    height: 36,
                    lineHeight: "36px",
                    borderRadius: "50%",
                    textAlign: "center",
                    margin: "auto",
                    cursor: "pointer",
                    ...(outsideCurrentMonth
                      ? { color: "#ccc" }
                      : { color: "inherit" }),
                    ...dayStyles,
                  }}
                >
                  {day.date()}
                </Box>
              );
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default HighlightedDateCalendar;
