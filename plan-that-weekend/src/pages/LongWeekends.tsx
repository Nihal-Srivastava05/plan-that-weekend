import React from "react";
import StaticCalendar from "../components/calendar.js";
import findLongWeekends from "../scripts/longWeekendFinder.ts";
import findLongWeekendSuggester from "../scripts/longWeekendSuggester.js";

interface LongWeekendsProps {
  data: string[];
}

export const LongWeekends: React.FC<LongWeekendsProps> = ({ data }) => {
  const longWeekends = findLongWeekends(data, 2024);
  const extraLongWeekends = findLongWeekendSuggester(data, 2024);
  console.log("login extraLongWeekends", extraLongWeekends);

  return (
    <div className="w-full">
      {longWeekends && <StaticCalendar longweekends={longWeekends} />}
    </div>
  );
};
