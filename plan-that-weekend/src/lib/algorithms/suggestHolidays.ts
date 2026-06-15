import {
  differenceInCalendarDays,
  addDays,
  format,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  getDay,
} from "date-fns";
import { DateString, Suggestion } from "../../types/holiday";

function getWeekendDates(year: number): DateString[] {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 11, 31));
  const allDays = eachDayOfInterval({ start, end });

  return allDays
    .filter((day) => getDay(day) === 0 || getDay(day) === 6)
    .map((date) => format(date, "yyyy-MM-dd"));
}

interface StreakInfo {
  dates: DateString[];
  length: number;
}

export function suggestHolidays(
  holidayDates: DateString[],
  year: number,
  maxGapDays: number = 3
): Suggestion[] {
  const weekends = getWeekendDates(year);
  const allDates = Array.from(new Set([...holidayDates, ...weekends])).sort();

  const suggestions: Suggestion[] = [];
  let currentStreak: DateString[] = [];
  const streaks: StreakInfo[] = [];

  for (let i = 0; i < allDates.length; i++) {
    const current = new Date(allDates[i]);
    const next = i + 1 < allDates.length ? new Date(allDates[i + 1]) : null;

    currentStreak.push(allDates[i]);

    if (!next || addDays(current, 1).getTime() !== next.getTime()) {
      if (currentStreak.length >= 2) {
        streaks.push({
          dates: [...currentStreak],
          length: currentStreak.length,
        });
      }

      if (next) {
        const gapDays = differenceInCalendarDays(next, current) - 1;

        if (gapDays > 0 && gapDays <= maxGapDays) {
          const gapDates: DateString[] = [];
          for (let j = 1; j <= gapDays; j++) {
            gapDates.push(format(addDays(current, j), "yyyy-MM-dd"));
          }

          const beforeLength = currentStreak.length;
          let afterLength = beforeLength + gapDays;

          const nextStreakIndex = i + 1;
          if (nextStreakIndex < allDates.length) {
            let nextStreakLength = 1;
            for (let k = nextStreakIndex + 1; k < allDates.length; k++) {
              const prevDate = new Date(allDates[k - 1]);
              const currDate = new Date(allDates[k]);
              if (addDays(prevDate, 1).getTime() === currDate.getTime()) {
                nextStreakLength++;
              } else {
                break;
              }
            }
            afterLength += nextStreakLength;
          }

          const totalDaysGained = afterLength;
          const benefitScore = totalDaysGained / gapDays;

          suggestions.push({
            id: `sg-${suggestions.length + 1}`,
            dates: gapDates,
            resultingWeekend: {
              start: currentStreak[0],
              end: format(
                addDays(new Date(allDates[i]), gapDays + 1),
                "yyyy-MM-dd"
              ),
              days: totalDaysGained,
            },
            benefitScore,
            daysOffRequired: gapDays,
            totalDaysGained,
          });
        }
      }

      currentStreak = [];
    }
  }

  return suggestions;
}
