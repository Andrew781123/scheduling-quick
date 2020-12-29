import { Box } from "@material-ui/core";
import React from "react";
import { dateRange, timeRange } from "../../../../types";
import { RangeDisplay } from "./RangeDisplay";

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
        <RangeDisplay fromRange={date[0]} toRange={date[1]} />
      )}
      <Box component='span' mx='10px'></Box>
      <RangeDisplay fromRange={timeSlot[0]} toRange={timeSlot[1]} />
    </>
  );
};
