import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { isWithinInterval, isSameDay } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const HighlightedDateCalendar = ({ longweekends }) => {
  let longWeekends = [];
  longweekends.forEach((e) => {
    if (e.length > 2) {
      longWeekends.push({ start: dayjs(e[0]), end: dayjs(e[e.length - 1]) });
    }
  });
  console.log("login", longWeekends);
  // Define a date range
  // const longWeekends = [
  //   { start: dayjs("2024-01-12"), end: dayjs("2024-01-14") }, // Jan 12-14, 2024
  //   { start: dayjs("2024-02-16"), end: dayjs("2024-02-18") }, // Feb 16-18, 2024
  //   { start: dayjs("2024-03-29"), end: dayjs("2024-03-31") }, // Mar 29-31, 2024
  // ];

  // Highlight logic using custom day slot props
  const getDayStyles = (day) => {
    const range = longWeekends.find(({ start, end }) =>
      day.isBetween(start, end, "day", "[]")
    );

    if (range) {
      const isStart = day.isSame(range.start, "day");
      const isEnd = day.isSame(range.end, "day");

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
