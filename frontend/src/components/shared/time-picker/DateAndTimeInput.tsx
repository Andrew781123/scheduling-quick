import { DatePicker } from "./DatePicker";
import React, { useState } from "react";
import { TimePicker } from "./TimePicker";
import { dateRange, timeRange } from "../../../shared/types";
import { periodState } from "../../../pages/setup-form/types";
import { Moment } from "moment";

interface DateAndTimeInputProps {
  selectDate: (dateField: string, date: Moment, index: number) => void;
  timeChange: (timeRange: timeRange, index: number) => void;
  period: periodState;
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
