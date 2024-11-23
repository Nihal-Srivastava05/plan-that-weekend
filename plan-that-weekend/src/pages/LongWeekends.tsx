import React from "react";
import findLongWeekends from "../scripts/longWeekendFinder.d.js";

export const LongWeekends = ({ data }) => {
  const longWeekends = findLongWeekends(data);
  console.log("Long weekends:", longWeekends);

  return (
    <>
      <h1>LongWeekends</h1>
    </>
  );
};
