import { DatePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React, { useState } from "react";
import { validateDateRange } from "../../shared/validation";
import { DateRangeState, FormErrors } from "./types";

interface DatePickersProps {
  dateIndex: number;
  minDate: Moment;
  maxDate: Moment;
  handleFromDateSelect: (date: Moment | null) => void;
  handleToDateSelect: (date: Moment | null) => void;
  dateRange: DateRangeState<Moment | null>;
  autoSetToDate: (fromDate: Moment, dateIndex: number) => void;
  setIsDateValid: (dateIndex: number, isValid: boolean) => void;
}

export const DatePickers: React.FC<DatePickersProps> = props => {
  const {
    dateIndex,
    minDate,
    maxDate,
    dateRange,
    handleFromDateSelect,
    handleToDateSelect,
    autoSetToDate,
    setIsDateValid
  } = props;

  const [userSetDateRangeBefore, setUserSetDateRangeBefore] = useState<{
    [key: string]: boolean;
  }>({});

  const selectFromDate = (date: Moment | null) => {
    handleFromDateSelect(date);

    if (dateRange.isRange && !userSetDateRangeBefore[dateIndex]) {
      autoSetToDate(date!, dateIndex);

      setUserSetDateRangeBefore(map => ({
        ...map,
        [dateIndex]: true
      }));

      return;
    }

    //only need to validate if it is range
    if (dateRange.isRange) validateDate(date!, true);
  };

  const selectToDate = (date: Moment | null) => {
    handleToDateSelect(date);

    if (!userSetDateRangeBefore[dateIndex]) {
      setUserSetDateRangeBefore(map => ({
        ...map,
        [dateIndex]: true
      }));
    }

    validateDate(date!, false);
  };

  const validateDate = (time: Moment, isFromDate: boolean) => {
    let errorMessage: FormErrors | undefined;

    errorMessage = validateDateRange({
      fromDate: isFromDate ? time : dateRange.fromDate,
      toDate: isFromDate ? dateRange.toDate : time
    });

    if (
      (errorMessage && dateRange.isValid) ||
      (!errorMessage && !dateRange.isValid)
    ) {
      setIsDateValid(dateIndex, !dateRange.isValid);
    }
  };

  return (
    <div>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        label={dateRange.isRange ? "From date" : ""}
        onChange={selectFromDate}
        value={dateRange.fromDate}
        disablePast={true}
        InputLabelProps={{
          shrink: true
        }}
        className={dateRange.isValid ? "" : "error"}
      ></DatePicker>

      {dateRange.isRange && (
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          label={dateRange.isRange ? "To date" : ""}
          onChange={selectToDate}
          value={dateRange.toDate}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
          className={dateRange.isValid ? "" : "error"}
        ></DatePicker>
      )}
    </div>
  );
};
