import React, { useState } from "react";
import {
  dateRangeState,
  FormErrors,
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
}

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = props => {
  const { selectPeriod, autoSetToTime, autoSetToDate, period, index } = props;
  const { dateRange, timeRange } = period;

  const [userSetFromFieldFirstTime, setUserSetFromFieldFirstTime] = useState({
    time: true,
    date: true
  });

  const [arePeriodFieldsValid, setArePeriodFieldsValid] = useState({
    fromTime: true,
    toTime: true,
    fromDate: true,
    toDate: true
  });

  const validatePeriod = (
    periodField: keyof periodState,
    dateAndTimeFromToField: keyof dateRangeState | keyof timeRangeState,
    data: Moment,
    isFromField: boolean
  ) => {
    let errorMessage: FormErrors | undefined;

    //validate data or time
    if (periodField === "dateRange") {
      (errorMessage as "Invalid date range" | undefined) = validateDateRange({
        fromDate: isFromField
          ? data
          : period[periodField][dateAndTimeFromToField as keyof dateRangeState],
        toDate: !isFromField
          ? data
          : period[periodField][dateAndTimeFromToField as keyof dateRangeState]
      });
    } else {
      (errorMessage as "Invalid time range" | undefined) = validateTimeRange({
        fromTime: isFromField
          ? data
          : period[periodField][dateAndTimeFromToField as keyof timeRangeState],
        toTime: !isFromField
          ? data
          : period[periodField][dateAndTimeFromToField as keyof timeRangeState]
      });
    }

    //set or reset error messages
    if (errorMessage && arePeriodFieldsValid[dateAndTimeFromToField]) {
      setArePeriodFieldsValid(fields => ({
        ...fields,
        [dateAndTimeFromToField]: false
      }));
    } else if (!errorMessage && !arePeriodFieldsValid[dateAndTimeFromToField]) {
      setArePeriodFieldsValid(fields => ({
        ...fields,
        [dateAndTimeFromToField]: true
      }));
    }
  };

  const handleFromDateSelect = (date: Moment | null) => {
    selectPeriod("dateRange", "fromDate", date!, index);

    if (userSetFromFieldFirstTime.date) {
      autoSetToDate(date!);
      setUserSetFromFieldFirstTime(state => ({
        ...state,
        date: false
      }));
      return;
    }

    validatePeriod("dateRange", "fromDate", date!, true);
  };

  const handleToDateSelect = (date: Moment | null) => {
    selectPeriod("dateRange", "toDate", date!, index);

    validatePeriod("dateRange", "toDate", date!, false);
  };

  const handleFromTimeSelect = (date: Moment | null) => {
    selectPeriod("timeRange", "fromTime", date!, index);

    if (userSetFromFieldFirstTime.time) {
      autoSetToTime(date!);
      setUserSetFromFieldFirstTime(state => ({
        ...state,
        time: false
      }));
      return;
    }

    validatePeriod("timeRange", "fromTime", date!, true);
  };

  const handleToTimeSelect = (date: Moment | null) => {
    selectPeriod("timeRange", "toTime", date!, index);

    validatePeriod("timeRange", "toTime", date!, false);
  };

  return (
    <div>
      <div>
        <DatePicker
          className={!arePeriodFieldsValid.fromDate ? "error" : ""}
          label='From Date'
          onChange={handleFromDateSelect}
          value={dateRange.fromDate}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
        ></DatePicker>
        <DatePicker
          className={!arePeriodFieldsValid.toDate ? "error" : ""}
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
          className={!arePeriodFieldsValid.fromTime ? "error" : ""}
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
          className={!arePeriodFieldsValid.toTime ? "error" : ""}
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
