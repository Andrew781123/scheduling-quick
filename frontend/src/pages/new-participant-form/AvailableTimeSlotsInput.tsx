import { DatePicker, TimePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React from "react";
import { TimePickers } from "./TimePickers";
import { DateAndTimeInput, timeSlot } from "./types";

interface AvailableTimeSlotsInputProps {
  dateAndTimeInput: DateAndTimeInput;
  dateIndex: number;
  selectDate: (date: Moment, dateIndex: number) => void;
  selectTime: (
    timeField: keyof timeSlot,
    time: Moment | null,
    dateIndex: number,
    timeIndex: number
  ) => void;
  addTimeSlot: (dateIndex: number) => void;
}

export const AvailableTimeSlotsInput: React.FC<AvailableTimeSlotsInputProps> = props => {
  const {
    dateAndTimeInput: { date, timeSlots },
    dateIndex,
    selectDate,
    selectTime,
    addTimeSlot
  } = props;

  const handleDateSelect = (date: Moment | null) => {
    selectDate(date!, dateIndex);
  };

  return (
    <div>
      <DatePicker
        label='Date'
        onChange={handleDateSelect}
        value={date}
        disablePast={true}
        InputLabelProps={{
          shrink: true
        }}
      ></DatePicker>
      {timeSlots.map((timeSlot, i) => (
        <TimePickers
          timeSlot={timeSlot}
          dateIndex={dateIndex}
          timeSlotIndex={i}
          handleTimeSelect={selectTime}
        />
      ))}
      <button onClick={() => addTimeSlot(dateIndex)}>Add one time slot</button>
    </div>
  );
};
