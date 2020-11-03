import { DatePicker } from "./DatePicker";
import React, { useState } from "react";
import { TimePicker } from "./TimePicker";
import { dateRange, period } from "../../../shared/types";

interface DateAndTimeInputProps {
  selectDate: (dateRange: dateRange, index: number) => void;
  period: period;
  index: number;
}

interface IDateAndTime {
  date: string;
  startTime: string;
  endTime: string;
}

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = props => {
  const { selectDate, period, index } = props;

  return (
    <>
      <DatePicker selectDate={selectDate} period={period} index={index} />
      <TimePicker />
    </>
  );
};
