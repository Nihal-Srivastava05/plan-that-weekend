import { useState } from "react";
import { Button } from "./ui/Button";
import { useHolidays } from "../hooks/useHolidays";

export default function AddHolidays() {
  const [value, setValue] = useState<string>("");
  const { addHoliday } = useHolidays();

  const addNewHoliday = () => {
    if (!value) {
      return;
    }

    addHoliday(value);
    setValue("");
  };

  return (
    <div className="space-y-3">
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md
                 bg-white dark:bg-neutral-700
                 text-neutral-900 dark:text-neutral-100
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      <Button onClick={addNewHoliday} disabled={!value} size="sm" fullWidth>
        Add Holiday
      </Button>
    </div>
  );
}
