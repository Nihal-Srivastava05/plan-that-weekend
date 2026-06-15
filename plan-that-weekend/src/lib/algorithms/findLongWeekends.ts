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
    const current = new Date(allDates[i]);
    const next = i + 1 < allDates.length ? new Date(allDates[i + 1]) : null;

    currentStreak.push(allDates[i]);

    if (!next || addDays(current, 1).getTime() !== next.getTime()) {
      if (currentStreak.length >= 3) {
        longWeekends.push({
          id: `lw-${longWeekends.length + 1}`,
          start: currentStreak[0],
          end: currentStreak[currentStreak.length - 1],
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
