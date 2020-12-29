import React from "react";
import { dateRange, timeRange } from "../../../../types";
import { TimeSlot } from "./TimeSlot";

interface DateAndTimeSlotDisplayProps {
  date: string | dateRange;
  timeSlot: timeRange;
}

export const DateAndTimeSlotDisplay: React.FC<DateAndTimeSlotDisplayProps> = props => {
  const { date, timeSlot } = props;

  return (
    <>
      {typeof date === "string" ? (
        <h3>{date}</h3>
      ) : (
        <TimeSlot fromTime={date[0]} toTime={date[1]} />
      )}
      <TimeSlot fromTime={timeSlot[0]} toTime={timeSlot[1]} />
    </>
  );
};
