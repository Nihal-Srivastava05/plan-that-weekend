function findLongWeekends(holidays) {
  /**
   * Given a list of holiday dates, computes all long weekends.
   * @param {string[]} holidays - List of holiday dates in "YYYY-MM-DD" format.
   * @returns {Array<[string, string]>} - List of long weekends as tuples (start_date, end_date).
   */

  // Convert holiday strings to Date objects and sort them
  const holidayDates = holidays
    .map((date) => new Date(date))
    .sort((a, b) => a - b);

  const longWeekends = [];

  // Helper function to check if a given date exists in the holiday list
  const isHoliday = (date) =>
    holidayDates.some((h) => h.getTime() === date.getTime());

  for (let i = 0; i < holidayDates.length; i++) {
    const holiday = holidayDates[i];
    const dayOfWeek = holiday.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    let weekendStart = null;
    let weekendEnd = null;

    if (dayOfWeek === 5) {
      // Friday
      weekendStart = holiday;
      weekendEnd = new Date(holiday);
      weekendEnd.setDate(holiday.getDate() + 2); // Sunday
    } else if (dayOfWeek === 0) {
      // Sunday
      weekendStart = new Date(holiday);
      weekendStart.setDate(holiday.getDate() - 2); // Friday
      weekendEnd = holiday;
    } else if (dayOfWeek === 6) {
      // Saturday
      weekendStart = new Date(holiday);
      weekendStart.setDate(holiday.getDate() - 1); // Friday
      weekendEnd = new Date(holiday);
      weekendEnd.setDate(holiday.getDate() + 1); // Sunday
    } else if (dayOfWeek === 1) {
      // Monday
      weekendStart = new Date(holiday);
      weekendStart.setDate(holiday.getDate() - 2); // Saturday
      weekendEnd = holiday;
    }

    // Check if the calculated range is valid and all dates are holidays
    if (weekendStart && weekendEnd) {
      const allDaysAreHolidays = [];
      for (
        let date = new Date(weekendStart);
        date <= weekendEnd;
        date.setDate(date.getDate() + 1)
      ) {
        allDaysAreHolidays.push(isHoliday(date));
      }

      if (allDaysAreHolidays.every(Boolean)) {
        longWeekends.push([
          weekendStart.toISOString().split("T")[0],
          weekendEnd.toISOString().split("T")[0],
        ]);
      }
    }
  }

  return longWeekends;
}

export default findLongWeekends;

// Example usage
// const holidays = [
//   "2024-01-12", // Friday
//   "2024-01-15", // Monday
//   "2024-03-29", // Friday (Good Friday)
//   "2024-03-30", // Saturday
//   "2024-03-31", // Sunday
//   "2024-07-04", // Thursday
//   "2024-07-05", // Friday
//   "2024-07-06", // Saturday
// ];

// const longWeekends = findLongWeekends(holidays);
// console.log("Long weekends:", longWeekends);
