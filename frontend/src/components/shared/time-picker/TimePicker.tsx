import React from "react";
import { ClockFace } from "./ClockFace";
import { timeRange as timeRangeType } from "../../../shared/types";
interface TimePickerProps {
  timeChange: (timeRange: timeRangeType, index: number) => void;
  index: number;
  timeRange: timeRangeType;
}

export const TimePicker: React.FC<TimePickerProps> = props => {
  const { timeChange, index, timeRange } = props;

  const [startTime, endTime] = timeRange;

  return (
    <div>
      <ClockFace
        startTime={startTime}
        endTime={endTime}
        index={index}
        timeChange={timeChange}
      />
    </div>
  );
};
