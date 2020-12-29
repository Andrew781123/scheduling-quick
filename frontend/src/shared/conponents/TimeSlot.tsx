import React from "react";

interface TimeSlotProps {
  fromTime: string;
  toTime: string;
}

export const TimeSlot: React.FC<TimeSlotProps> = props => {
  const { fromTime, toTime } = props;

  return (
    <h3>
      Time: {fromTime} - {toTime}
    </h3>
  );
};
