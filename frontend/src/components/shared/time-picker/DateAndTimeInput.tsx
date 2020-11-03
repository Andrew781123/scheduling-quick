import { DatePicker } from "./DatePicker";
import React, { useState } from "react";
import { TimePicker } from "./TimePicker";

interface DateAndTimeInputProps {
  selectDate: (date: string) => void;
}

interface IDateAndTime {
  date: string;
  startTime: string;
  endTime: string;
}

const initialDateAndTime: IDateAndTime = {
  date: "",
  startTime: "",
  endTime: ""
};

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = props => {
  const { selectDate } = props;

  const [dateAndTime, setDateAndTime] = useState(initialDateAndTime);

  const handleDateSelect = (selectedDate: string) => {
    setDateAndTime(dateAndTime => {
      return {
        ...dateAndTime,
        date: selectedDate
      };
    });

    selectDate(selectedDate);
  };

  return (
    <>
      <DatePicker handleDateSelect={handleDateSelect} />
      <TimePicker />
    </>
  );
};
