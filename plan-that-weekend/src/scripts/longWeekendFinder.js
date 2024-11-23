import {
  format,
  addDays,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  getDay,
} from "date-fns";

/**
 * Get all Saturdays and Sundays for a given year
 */
function getWeekendDates(year) {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 11, 31));
  const allDays = eachDayOfInterval({ start, end });

  return allDays
    .filter((day) => getDay(day) === 0 || getDay(day) === 6) // 0: Sunday, 6: Saturday
    .map((date) => format(date, "yyyy-MM-dd")); // Format dates as strings
}

/**
 * Find the Longest Non-Overlapping Subsequence (LCS-like logic)
 */
function findLongWeekends(holidayList, year) {
  const weekends = getWeekendDates(year);
  const allHolidays = Array.from(new Set([...holidayList, ...weekends])).sort(); // Merge and sort dates

  const longWeekends = [];
  let tempStreak = [];

  // Traverse the dates to find streaks
  for (let i = 0; i < allHolidays.length; i++) {
    const current = new Date(allHolidays[i]);
    const next =
      i + 1 < allHolidays.length ? new Date(allHolidays[i + 1]) : null;

    if (next && addDays(current, 1).getTime() === next.getTime()) {
      // If dates are consecutive, add to the streak
      tempStreak.push(format(current, "yyyy-MM-dd"));
    } else {
      // Close the streak
      tempStreak.push(format(current, "yyyy-MM-dd"));
      if (tempStreak.length >= 2) {
        // Add streak as a long weekend if it has 2+ consecutive days
        longWeekends.push(tempStreak);
      }
      tempStreak = [];
    }
  }

  return longWeekends;
}

export default findLongWeekends;
