import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/system";

const StyledDateCalendar = styled(DateCalendar)({
  "&.MuiDateCalendar-root": {
    margin: "5px",
    width: "100%",
    maxHeight: "none",
    "& .MuiDayCalendar-weekDayLabel": {
      fontSize: "1rem",
    },
    '& div[role="row"]': {
      justifyContent: "space-around",
    },
    "& .MuiDayCalendar-slideTransition": {
      minHeight: "500px",
    },
    "& .MuiPickersDay-root": {
      height: "50px",
      width: "50px",
      fontSize: "1rem",
    },
  },
});

export default StyledDateCalendar;
