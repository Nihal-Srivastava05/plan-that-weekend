import React from "react";
import StyledDateCalendar from "./StyledCalendar";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface HighlightedDateCalendarProps {
  longweekends: string[][];
  suggestedHolidays: { date: string[]; benefit: number }[];
}

const HighlightedDateCalendar: React.FC<HighlightedDateCalendarProps> = ({
  longweekends,
  suggestedHolidays,
}) => {
  const longWeekends: { start: dayjs.Dayjs; end: dayjs.Dayjs }[] = [];
  longweekends.forEach((e: string[]) => {
    if (e.length > 2) {
      longWeekends.push({ start: dayjs(e[0]), end: dayjs(e[e.length - 1]) });
    }
  });

  const getDayStyles = (day: dayjs.Dayjs) => {
    const range = longWeekends.find(({ start, end }) =>
      day.isBetween(start, end, "day", "[]")
    );

    if (range) {
      const isStart = day.isSame(range.start, "day");
      const isEnd = day.isSame(range.end, "day");

      return {
        backgroundColor: "#9e9e9e", // Highlighted background
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
        <StyledDateCalendar
          className="w-full"
          views={["year", "month", "day"]}
          slots={{
            day: ({ day, onDaySelect, outsideCurrentMonth }) => {
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
