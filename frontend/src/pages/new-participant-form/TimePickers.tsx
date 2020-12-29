import { TimePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React from "react";
import { timeSlot } from "./types";

interface TimePickersProps {
  timeSlotIndex: number;
  dateIndex: number;
  timeSlot: timeSlot;
  handleTimeSelect: (
    timeField: keyof timeSlot,
    time: Moment | null,
    dateIndex: number,
    timeIndex: number
  ) => void;
}

export const TimePickers: React.FC<TimePickersProps> = props => {
  const { timeSlot, timeSlotIndex, dateIndex, handleTimeSelect } = props;

  const handleFromTimeSelect = (time: Moment | null) => {
    handleTimeSelect("fromTime", time, dateIndex, timeSlotIndex);
  };

  const handleToTimeSelect = (time: Moment | null) => {
    handleTimeSelect("toTime", time, dateIndex, timeSlotIndex);
  };

  const editClockNumStyles = () => {
    const clock = document.querySelector(".MuiPickersClock-clock");

    console.log("in if");
    if (clock && clock.childElementCount < 15) {
      const clockNum = document.querySelectorAll(
        ".MuiTypography-root.MuiPickersClockNumber-clockNumber.MuiTypography-body1"
      );

      ((clockNum! as unknown) as HTMLCollectionOf<HTMLElement>)[5].style.display =
        "none";

      const element = clockNum[5];
    }
  };

  return (
    <>
      <TimePicker
        label='From time'
        ampm={false}
        value={timeSlot.fromTime}
        onChange={handleFromTimeSelect}
        minutesStep={15}
        InputLabelProps={{
          shrink: true
        }}
        onOpen={editClockNumStyles}
      />
      <TimePicker
        label='To time'
        ampm={false}
        value={timeSlot.toTime}
        onChange={handleToTimeSelect}
        minutesStep={15}
        InputLabelProps={{
          shrink: true
        }}
      />
    </>
  );
};
