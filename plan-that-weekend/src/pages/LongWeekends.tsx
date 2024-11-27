import React from "react";
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

  return (
    <div className="w-full">
      {longWeekends && (
        <HighlightedDateCalendar
          longweekends={longWeekends}
          suggestedHolidays={suggestedHolidays}
        />
      )}
    </div>
  );
};
