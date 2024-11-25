import {
  differenceInCalendarDays,
  addDays,
  format,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  getDay,
} from "date-fns";

/**
 * Get all Saturdays and Sundays for a given year
 */
function getWeekendDates(year: number) {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 11, 31));
  const allDays = eachDayOfInterval({ start, end });

  return allDays
    .filter((day) => getDay(day) === 0 || getDay(day) === 6) // 0: Sunday, 6: Saturday
    .map((date) => format(date, "yyyy-MM-dd")); // Format dates as strings
}

/**
 * Find the Longest Non-Overlapping Subsequence (LCS-like logic)
 * Also suggest additional holidays for maximizing vacations
 */
function findLongWeekendSuggester(holidayList: string[], year: number) {
  const weekends = getWeekendDates(year);
  const allHolidays = Array.from(new Set([...holidayList, ...weekends])).sort(); // Merge and sort dates

  const longWeekends = [];
  const suggestedHolidays = [];
  let tempStreak = [];

  // Traverse the dates to find streaks and gaps
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

    // Check for gaps between current and next dates
    if (next) {
      const gapDays = differenceInCalendarDays(next, current) - 1;
      if (gapDays == 1) {
        const potentialHoliday = format(addDays(current, 1), "yyyy-MM-dd");

        // Calculate benefit: Length of new streak if holiday is added
        const beforeStreak = tempStreak.length;
        const afterStreak = beforeStreak + gapDays + 1; // Gap days + current streak
        const benefit = afterStreak - beforeStreak;

        suggestedHolidays.push({
          date: [potentialHoliday],
          benefit,
        });
      } else if (gapDays == 2) {
        const potentialHoliday_1 = format(addDays(current, 1), "yyyy-MM-dd");
        const potentialHoliday_2 = format(addDays(current, 2), "yyyy-MM-dd");

        // Calculate benefit: Length of new streak if holiday is added
        const beforeStreak = tempStreak.length;
        const afterStreak = beforeStreak + gapDays + 1; // Gap days + current streak
        const benefit = afterStreak - beforeStreak;

        suggestedHolidays.push({
          date: [potentialHoliday_1, potentialHoliday_2],
          benefit,
        });
      }
    }
  }

  return { longWeekends, suggestedHolidays };
}

export default findLongWeekendSuggester;
