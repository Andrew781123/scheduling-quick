import { DatePicker } from "./DatePicker";
import React, { useState } from "react";
import { TimePicker } from "./TimePicker";
import { dateRange, period, timeRange } from "../../../shared/types";

interface DateAndTimeInputProps {
  selectDate: (dateRange: dateRange, index: number) => void;
  timeChange: (timeRange: timeRange, index: number) => void;
  period: period;
  index: number;
}

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = props => {
  const {
    selectDate,
    timeChange,
    period: { dateRange, timeRange },
    index
  } = props;

  return (
    <>
      <DatePicker selectDate={selectDate} dateRange={dateRange} index={index} />
      <TimePicker timeChange={timeChange} index={index} timeRange={timeRange} />
    </>
  );
};
