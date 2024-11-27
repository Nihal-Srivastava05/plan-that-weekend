import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface AddHolidaysProps {
  setData: (data: string[] | ((oldArray: string[]) => string[])) => void;
}

const AddHolidays: React.FC<AddHolidaysProps> = ({ setData }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const addNewHoliday = () => {
    if (value) {
      setData((oldArray: string[]) => [
        ...oldArray,
        value.format("YYYY-MM-DD"),
      ]);
    }
  };

  return (
    <div className="mt-5 px-2 py-5">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Basic date picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
          <button
            onClick={addNewHoliday}
            className="bg-black text-white px-4 py-1 mx-4 rounded-md"
          >
            Add
          </button>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default AddHolidays;
