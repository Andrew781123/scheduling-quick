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

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

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
      <input type='number' min='1' max='31' onChange={handleDateSelect} />
      <TimePicker />
    </>
  );
};
