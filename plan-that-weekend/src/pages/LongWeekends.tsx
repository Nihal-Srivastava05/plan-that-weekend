import React from "react";
import StaticCalendar from "../components/calendar.js";
import findLongWeekends from "../scripts/longWeekendFinder.ts";

interface LongWeekendsProps {
  data: string[];
}

export const LongWeekends: React.FC<LongWeekendsProps> = ({ data }) => {
  const longWeekends = findLongWeekends(data, 2024);

  return (
    <>
      <h1>LongWeekends</h1>
      {longWeekends && <StaticCalendar longweekends={longWeekends} />}
    </>
  );
};
