import React from "react";
import {
  dateRangeState,
  periodState,
  timeRangeState
} from "../../../pages/setup-form/types";
import { Moment } from "moment";
import { TimePicker, DatePicker } from "@material-ui/pickers";

interface DateAndTimeInputProps {
  selectPeriod: (
    periodField: keyof periodState,
    fromToField: keyof dateRangeState | keyof timeRangeState,
    date: Moment,
    index: number
  ) => void;
  period: periodState;
  index: number;
}

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = props => {
  const {
    selectPeriod,
    period: { dateRange, timeRange },
    index
  } = props;

  const handleFromDateSelect = (date: Moment | null) => {
    selectPeriod("dateRange", "fromDate", date!, index);
  };

  const handleToDateSelect = (date: Moment | null) => {
    selectPeriod("dateRange", "toDate", date!, index);
  };

  const handleFromTimeSelect = (date: Moment | null) => {
    selectPeriod("timeRange", "fromTime", date!, index);
  };

  const handleToTimeSelect = (date: Moment | null) => {
    selectPeriod("timeRange", "toTime", date!, index);
  };

  return (
    <div>
      <div>
        <DatePicker
          label='From Date'
          onChange={handleFromDateSelect}
          value={dateRange.fromDate}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
        ></DatePicker>
        <DatePicker
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
          label='To time'
          ampm={false}
          value={timeRange.toTime}
          onChange={handleToTimeSelect}
          minutesStep={15}
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    </div>
  );
};
