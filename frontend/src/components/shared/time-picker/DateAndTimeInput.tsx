import React, { useState } from "react";
import {
  dateRangeState,
  periodState,
  timeRangeState
} from "../../../pages/setup-form/types";
import { Moment } from "moment";
import { TimePicker, DatePicker } from "@material-ui/pickers";
import {
  validateDateRange,
  validateTimeRange
} from "../../../shared/validation";

interface DateAndTimeInputProps {
  selectPeriod: (
    periodField: keyof periodState,
    fromToField: keyof dateRangeState | keyof timeRangeState,
    date: Moment,
    index: number
  ) => void;
  autoSetToTime: (fromTime: Moment) => void;
  autoSetToDate: (fromDate: Moment) => void;
  period: periodState;
  index: number;
  arePeriodFieldsValid: { timeRange: boolean; dateRange: boolean };
  setArePeriodFieldsValid: React.Dispatch<
    React.SetStateAction<{
      timeRange: boolean;
      dateRange: boolean;
    }>
  >;
}

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = props => {
  const {
    selectPeriod,
    autoSetToTime,
    autoSetToDate,
    period,
    index,
    arePeriodFieldsValid,
    setArePeriodFieldsValid
  } = props;
  const { dateRange, timeRange } = period;

  const [userSetDateOrTimeFirstTime, setUserSetDateOrTimeFirstTime] = useState({
    timeRange: true,
    dateRange: true
  });

  const validatePeriod = (
    periodField: keyof periodState,
    data: Moment,
    isFromField: boolean
  ) => {
    //auto set date/time if first select
    if (userSetDateOrTimeFirstTime[periodField]) {
      setUserSetDateOrTimeFirstTime(state => ({
        ...state,
        [periodField]: false
      }));

      //if set time/date field first time && set from field
      if (isFromField) {
        if (periodField === "dateRange") autoSetToDate(data);
        else autoSetToTime(data);
      }

      return;
    }

    let errorMessage: string | undefined;

    //validate data or time
    if (periodField === "dateRange") {
      (errorMessage as "Invalid date range" | undefined) = validateDateRange({
        fromDate: isFromField ? data : period[periodField]["fromDate"],
        toDate: !isFromField ? data : period[periodField]["toDate"]
      });
    } else {
      (errorMessage as "Invalid time range" | undefined) = validateTimeRange({
        fromTime: isFromField ? data : period[periodField]["fromTime"],
        toTime: !isFromField ? data : period[periodField]["toTime"]
      });
    }

    //toggle isValid
    if (
      (errorMessage && arePeriodFieldsValid[periodField]) ||
      (!errorMessage && !arePeriodFieldsValid[periodField])
    ) {
      setArePeriodFieldsValid(fields => ({
        ...fields,
        [periodField]: !fields[periodField]
      }));
    }
  };

  const handleFromDateSelect = (date: Moment | null) => {
    selectPeriod("dateRange", "fromDate", date!, index);

    validatePeriod("dateRange", date!, true);
  };

  const handleToDateSelect = (date: Moment | null) => {
    selectPeriod("dateRange", "toDate", date!, index);

    validatePeriod("dateRange", date!, false);
  };

  const handleFromTimeSelect = (date: Moment | null) => {
    selectPeriod("timeRange", "fromTime", date!, index);

    validatePeriod("timeRange", date!, true);
  };

  const handleToTimeSelect = (date: Moment | null) => {
    selectPeriod("timeRange", "toTime", date!, index);

    validatePeriod("timeRange", date!, false);
  };

  return (
    <div>
      <div>
        <DatePicker
          className={!arePeriodFieldsValid.dateRange ? "error" : ""}
          label='From Date'
          onChange={handleFromDateSelect}
          value={dateRange.fromDate}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
        ></DatePicker>
        <DatePicker
          className={!arePeriodFieldsValid.dateRange ? "error" : ""}
          label='To Date'
          onChange={handleToDateSelect}
          value={dateRange.toDate}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
        ></DatePicker>
      </div>
      <br />
      <div>
        <TimePicker
          className={!arePeriodFieldsValid.timeRange ? "error" : ""}
          label='From time'
          ampm={false}
          value={timeRange.fromTime}
          onChange={handleFromTimeSelect}
          minutesStep={15}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TimePicker
          className={!arePeriodFieldsValid.timeRange ? "error" : ""}
          label='To time'
          ampm={false}
          value={timeRange.toTime}
          onChange={handleToTimeSelect}
          minutesStep={15}
          InputLabelProps={{
            shrink: true
          }}
          invalidDateMessage={<h1>wrong</h1>}
        />
      </div>
    </div>
  );
};
