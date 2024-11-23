import StaticCalendar from "../components/calendar.js";
import findLongWeekends from "../scripts/longWeekendFinder.d.js";

export const LongWeekends = ({ data }) => {
  //   console.log("data", data);
  const holidays = [
    "2024-01-12", // Friday
    "2024-01-15", // Monday
    "2024-03-29", // Friday (Good Friday)
    "2024-03-30", // Saturday
    "2024-03-31", // Sunday
    "2024-07-04", // Thursday
    "2024-07-05", // Friday
    "2024-07-06", // Saturday
  ];
  const longWeekends = findLongWeekends(holidays);
  console.log("Long weekends:", longWeekends);

  return (
    <>
      <h1>LongWeekends</h1>
      {longWeekends && (
        <StaticCalendar longweekends={longWeekends} year={2024} month={1} />
      )}
    </>
  );
};
