import StaticCalendar from "../components/calendar.js";
import findLongWeekends from "../scripts/longWeekendFinder";

export const LongWeekends = ({ data }) => {
  const longWeekends = findLongWeekends(data, 2024);

  return (
    <>
      <h1>LongWeekends</h1>
      {longWeekends && <StaticCalendar longweekends={longWeekends} />}
    </>
  );
};
