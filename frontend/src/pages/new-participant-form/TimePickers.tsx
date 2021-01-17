import { TimePicker, validate } from "@material-ui/pickers";
import { Moment } from "moment";
import React, { useState } from "react";
import { DateAndTimeInput, timeSlot, TwoDimentionalMap } from "./types";
import { convertCoordinatesToKey } from "./utils";

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
  validatePeriod: (
    periodField: keyof DateAndTimeInput,
    data: Moment,
    isFromField: boolean,
    timeIndex?: number | undefined
  ) => void;
  autoSetToTime: (
    fromTime: Moment,
    dateIndex: number,
    timeIndex: number
  ) => void;
}

export const TimePickers: React.FC<TimePickersProps> = props => {
  const {
    timeSlot,
    timeSlotIndex,
    dateIndex,
    handleTimeSelect,
    validatePeriod,
    autoSetToTime
  } = props;

  const [
    userSetTimeSlotBefore,
    setUserSetTimeSlotBefore
  ] = useState<TwoDimentionalMap>({});

  const handleFromTimeSelect = (time: Moment | null) => {
    const key = convertCoordinatesToKey(dateIndex, timeSlotIndex);

    if (!userSetTimeSlotBefore[key]) {
      autoSetToTime(time!, dateIndex, timeSlotIndex);

      setUserSetTimeSlotBefore(map => ({
        ...map,
        [key]: true
      }));
    }

    handleTimeSelect("fromTime", time, dateIndex, timeSlotIndex);
  };

  const handleToTimeSelect = (time: Moment | null) => {
    const key = convertCoordinatesToKey(dateIndex, timeSlotIndex);

    if (!userSetTimeSlotBefore[key]) {
      setUserSetTimeSlotBefore(map => ({
        ...map,
        [key]: true
      }));
    }

    handleTimeSelect("toTime", time, dateIndex, timeSlotIndex);
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
