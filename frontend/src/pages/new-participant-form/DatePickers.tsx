import { DatePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React from "react";
import { DateRangeState } from "./types";

interface DatePickersProps {
  minDate: Moment;
  maxDate: Moment;
  handleFromDateSelect: (date: Moment | null) => void;
  handleToDateSelect: (date: Moment | null) => void;
  dateRange: DateRangeState;
}

export const DatePickers: React.FC<DatePickersProps> = props => {
  const {
    minDate,
    maxDate,
    dateRange,
    handleFromDateSelect,
    handleToDateSelect
  } = props;

  return (
    <div>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        label={dateRange.isRange ? "From date" : ""}
        onChange={handleFromDateSelect}
        value={dateRange.fromDate}
        disablePast={true}
        InputLabelProps={{
          shrink: true
        }}
        className='error'
      ></DatePicker>

      {dateRange.isRange && (
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          label={dateRange.isRange ? "To date" : ""}
          onChange={handleToDateSelect}
          value={dateRange.toDate}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
        ></DatePicker>
      )}
    </div>
  );
};
