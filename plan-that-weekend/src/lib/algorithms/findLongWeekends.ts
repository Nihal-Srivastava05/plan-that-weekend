import {
  format,
  addDays,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  getDay,
} from "date-fns";
import { DateString, LongWeekend } from "../../types/holiday";

function getWeekendDates(year: number): DateString[] {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 11, 31));
  const allDays = eachDayOfInterval({ start, end });

  return allDays
    .filter((day) => getDay(day) === 0 || getDay(day) === 6)
    .map((date) => format(date, "yyyy-MM-dd"));
}

export function findLongWeekends(
  holidayDates: DateString[],
  year: number
): LongWeekend[] {
  const weekends = getWeekendDates(year);
  const allDates = Array.from(new Set([...holidayDates, ...weekends])).sort();

  const longWeekends: LongWeekend[] = [];
  let currentStreak: DateString[] = [];

  for (let i = 0; i < allDates.length; i++) {
    const currentDate = allDates[i];
    if (!currentDate) continue;

    const current = new Date(currentDate);
    const nextDate = allDates[i + 1];
    const next = nextDate ? new Date(nextDate) : null;

    currentStreak.push(currentDate);

    if (!next || addDays(current, 1).getTime() !== next.getTime()) {
      const streakStart = currentStreak[0];
      const streakEnd = currentStreak[currentStreak.length - 1];

      if (currentStreak.length >= 3 && streakStart && streakEnd) {
        longWeekends.push({
          id: `lw-${longWeekends.length + 1}`,
          start: streakStart,
          end: streakEnd,
          days: currentStreak.length,
          includesHoliday: currentStreak.some((date) =>
            holidayDates.includes(date)
          ),
        });
      }
      currentStreak = [];
    }
  }

  return longWeekends;
}
