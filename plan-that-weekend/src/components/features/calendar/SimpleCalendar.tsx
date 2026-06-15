import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns';
import { DateString } from '../../../types/holiday';

interface SimpleCalendarProps {
  year: number;
  month: number;
  holidays: DateString[];
  longWeekendDates: DateString[];
  suggestedDates: DateString[];
}

export function SimpleCalendar({
  year,
  month,
  holidays,
  longWeekendDates,
  suggestedDates,
}: SimpleCalendarProps) {
  const monthStart = startOfMonth(new Date(year, month - 1, 1));
  const monthEnd = endOfMonth(monthStart);

  // Get all days in the month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad the beginning to start on Sunday
  const startDay = getDay(monthStart);
  const paddingDays = Array(startDay).fill(null);

  const isWeekend = (date: Date) => {
    const day = getDay(date);
    return day === 0 || day === 6;
  };

  const getDayStyle = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');

    if (longWeekendDates.includes(dateStr)) {
      return 'bg-success-200 dark:bg-success-900/40 text-success-900 dark:text-success-100 font-semibold border-success-500';
    }
    if (suggestedDates.includes(dateStr)) {
      return 'bg-warning-200 dark:bg-warning-900/40 text-warning-900 dark:text-warning-100 font-semibold border-warning-500';
    }
    if (holidays.includes(dateStr)) {
      return 'bg-primary-200 dark:bg-primary-900/40 text-primary-900 dark:text-primary-100 font-semibold border-primary-500';
    }
    if (isWeekend(date)) {
      return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400';
    }
    return 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100';
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
        {format(monthStart, 'MMMM yyyy')}
      </h3>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-neutral-600 dark:text-neutral-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="aspect-square" />
        ))}

        {daysInMonth.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const isHoliday = holidays.includes(dateStr);
          const isLongWeekend = longWeekendDates.includes(dateStr);
          const isSuggested = suggestedDates.includes(dateStr);

          return (
            <div
              key={dateStr}
              className={`
                aspect-square flex items-center justify-center
                rounded-md border transition-all
                ${getDayStyle(date)}
                ${isHoliday || isLongWeekend || isSuggested ? 'border-2' : 'border'}
                hover:scale-105 cursor-pointer
              `.trim().replace(/\s+/g, ' ')}
              title={
                isLongWeekend
                  ? 'Part of long weekend'
                  : isSuggested
                  ? 'Suggested holiday'
                  : isHoliday
                  ? 'Your holiday'
                  : ''
              }
            >
              <span className="text-sm">{format(date, 'd')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
