import StaticCalendar from "../components/calendar.js";
import findLongWeekends from "../scripts/longWeekendFinder";

export const LongWeekends = ({ data }) => {
  console.log("data", data);
  // const userHolidays = [
  //   "2024-01-12", // Friday
  //   "2024-01-13", // Saturday
  //   "2024-01-15", // Monday
  //   "2024-03-29", // Friday
  //   "2024-03-31", // Sunday
  // ];
  const longWeekends = findLongWeekends(data, 2024);

  return (
    <>
      <h1>LongWeekends</h1>
      {longWeekends && <StaticCalendar longweekends={longWeekends} />}
    </>
  );
};
