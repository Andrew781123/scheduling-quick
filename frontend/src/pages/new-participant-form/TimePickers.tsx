import { TimePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import React, { useMemo, useState } from "react";
import { validateTimeRange } from "../../shared/validation";
import { FormErrors, timeSlot, TwoDimentionalMap } from "./types";
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
  autoSetToTime: (
    fromTime: Moment,
    dateIndex: number,
    timeIndex: number
  ) => void;
  setIsTimeSlotValid: (
    dateIndex: number,
    timeSlotIndex: number,
    isValid: boolean
  ) => void;
}

export const TimePickers: React.FC<TimePickersProps> = props => {
  const {
    timeSlot,
    timeSlotIndex,
    dateIndex,
    handleTimeSelect,
    autoSetToTime,
    setIsTimeSlotValid
  } = props;

  const [
    userSetTimeSlotBefore,
    setUserSetTimeSlotBefore
  ] = useState<TwoDimentionalMap>({});

  const key = useMemo(() => {
    return convertCoordinatesToKey(dateIndex, timeSlotIndex);
  }, [dateIndex, timeSlotIndex]);

  const handleFromTimeSelect = (time: Moment | null) => {
    handleTimeSelect("fromTime", time, dateIndex, timeSlotIndex);

    if (!userSetTimeSlotBefore[key]) {
      autoSetToTime(time!, dateIndex, timeSlotIndex);

      setUserSetTimeSlotBefore(map => ({
        ...map,
        [key]: true
      }));

      return;
    }

    validateTimeSlot(time!, true);
  };

  const handleToTimeSelect = (time: Moment | null) => {
    handleTimeSelect("toTime", time, dateIndex, timeSlotIndex);

    if (!userSetTimeSlotBefore[key]) {
      setUserSetTimeSlotBefore(map => ({
        ...map,
        [key]: true
      }));
    }

    validateTimeSlot(time!, false);
  };

  const validateTimeSlot = (time: Moment, isFromTime: boolean) => {
    let errorMessage: FormErrors | undefined;

    errorMessage = validateTimeRange({
      fromTime: isFromTime ? time : timeSlot.fromTime,
      toTime: isFromTime ? timeSlot.toTime : time
    });

    if (
      (errorMessage && timeSlot.isValid) ||
      (!errorMessage && !timeSlot.isValid)
    ) {
      setIsTimeSlotValid(dateIndex, timeSlotIndex, !timeSlot.isValid);
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
        className={timeSlot.isValid ? "" : "error"}
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
        className={timeSlot.isValid ? "" : "error"}
      />
    </>
  );
};
