import { TimePicker, validate } from "@material-ui/pickers";
import { Moment } from "moment";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { validateTimeRange } from "../../shared/validation";
import {
  DateAndTimeInput,
  FormErrors,
  timeSlot,
  TwoDimentionalMap
} from "./types";
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
  areTimeSlotsValid: TwoDimentionalMap;
  setAreTimeSlosValid: React.Dispatch<React.SetStateAction<TwoDimentionalMap>>;
}

export const TimePickers: React.FC<TimePickersProps> = props => {
  const {
    timeSlot,
    timeSlotIndex,
    dateIndex,
    handleTimeSelect,
    autoSetToTime,
    areTimeSlotsValid,
    setAreTimeSlosValid
  } = props;

  const [
    userSetTimeSlotBefore,
    setUserSetTimeSlotBefore
  ] = useState<TwoDimentionalMap>({});

  useLayoutEffect(() => {
    //initialize the map
    setAreTimeSlosValid(map => ({
      ...map,
      [key]: true
    }));
  }, []);

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
      (errorMessage && areTimeSlotsValid[key]) ||
      (!errorMessage && !areTimeSlotsValid[key])
    ) {
      setAreTimeSlosValid(map => ({
        ...map,
        [key]: !map[key]
      }));
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
        className={areTimeSlotsValid[key] ? "" : "error"}
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
        className={areTimeSlotsValid[key] ? "" : "error"}
      />
    </>
  );
};
