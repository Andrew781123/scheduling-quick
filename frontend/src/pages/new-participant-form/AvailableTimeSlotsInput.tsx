import { DatePicker, TimePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React from "react";
import { AvailableTimeSlot } from "./types";

interface AvailableTimeSlotsInputProps {
  availableTimeSlot: AvailableTimeSlot;
  index: number;
  selectDateOrTime: (
    field: keyof AvailableTimeSlot,
    date: Moment,
    index: number
  ) => void;
}

export const AvailableTimeSlotsInput: React.FC<AvailableTimeSlotsInputProps> = props => {
  const {
    availableTimeSlot: { date, fromTime, toTime },
    index,
    selectDateOrTime
  } = props;

  const handleDateSelect = (date: Moment | null) => {
    selectDateOrTime("date", date!, index);
  };

  const handleFromTimeSelect = (date: Moment | null) => {
    selectDateOrTime("fromTime", date!, index);
  };

  const handleToTimeSelect = (date: Moment | null) => {
    selectDateOrTime("toTime", date!, index);
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
      <TimePicker
        label='From time'
        ampm={false}
        value={fromTime}
        onChange={handleFromTimeSelect}
        minutesStep={15}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TimePicker
        label='From time'
        ampm={false}
        value={toTime}
        onChange={handleToTimeSelect}
        minutesStep={15}
        InputLabelProps={{
          shrink: true
        }}
      />
    </div>
  );
};
