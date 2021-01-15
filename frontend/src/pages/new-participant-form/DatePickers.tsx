import { DatePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React from "react";

interface DatePickersProps {
  minDate: Moment;
  maxDate: Moment;
  handleDateSelect: (date: Moment | null) => void;
  date: Moment | null;
}

export const DatePickers: React.FC<DatePickersProps> = props => {
  const { minDate, maxDate, date, handleDateSelect } = props;

  return (
    <div>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleDateSelect}
        value={date}
        disablePast={true}
        InputLabelProps={{
          shrink: true
        }}
      ></DatePicker>
    </div>
  );
};
