import React, { useState } from "react";
import HighlightedDateCalendar from "../components/calendar.js";
import findLongWeekendSuggester from "../scripts/longWeekendSuggester.ts";

interface LongWeekendsProps {
  data: string[];
}

export const LongWeekends: React.FC<LongWeekendsProps> = ({ data }) => {
  const { longWeekends, suggestedHolidays } = findLongWeekendSuggester(
    data,
    2024
  );

  const [currentMonth, setCurrentMonth] = useState(2);

  const nextMonth = () => {
    let curr = Number(currentMonth);
    if (curr == 12) {
      setCurrentMonth(1);
    } else {
      curr += 1;
      setCurrentMonth(curr);
    }
  };

  const prevMonth = () => {
    let curr = Number(currentMonth);
    if (curr == 1) {
      setCurrentMonth(12);
    } else {
      curr -= 1;
      setCurrentMonth(curr);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-5 text-center">
        <button
          onClick={prevMonth}
          className="bg-black text-white px-4 py-1 mx-2 rounded-md"
        >
          Previous Month
        </button>
        <button
          onClick={nextMonth}
          className="bg-black text-white px-4 py-1 mx-2 rounded-md"
        >
          Next Month
        </button>
      </div>
      {longWeekends && (
        <>
          <HighlightedDateCalendar
            longweekends={longWeekends}
            suggestedHolidays={suggestedHolidays}
            referenceDate={`2024-${
              currentMonth != 1 ? currentMonth - 1 : 12
            }-02`}
          />
          <HighlightedDateCalendar
            longweekends={longWeekends}
            suggestedHolidays={suggestedHolidays}
            referenceDate={`2024-${currentMonth}-02`}
          />
          <HighlightedDateCalendar
            longweekends={longWeekends}
            suggestedHolidays={suggestedHolidays}
            referenceDate={`2024-${
              currentMonth != 12 ? currentMonth + 1 : 1
            }-02`}
          />
        </>
      )}
    </div>
  );
};
