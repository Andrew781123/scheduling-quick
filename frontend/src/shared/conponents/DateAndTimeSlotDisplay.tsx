import { Box } from "@material-ui/core";
import React from "react";
import { dateRange, timeRange } from "../../../../types";
import { RangeDisplay } from "./RangeDisplay";
import EventIcon from "@material-ui/icons/Event";

interface DateAndTimeSlotDisplayProps {
  date: string | dateRange;
  timeSlot: timeRange;
  withIcon: boolean;
}

export const DateAndTimeSlotDisplay: React.FC<DateAndTimeSlotDisplayProps> = props => {
  const { date, timeSlot, withIcon } = props;

  return (
    <>
      {typeof date === "string" && !withIcon ? (
        <h3>{date}</h3>
      ) : typeof date === "string" && withIcon ? (
        <div>
          <EventIcon />
          <span>{date}</span>
        </div>
      ) : (
        <RangeDisplay fromRange={date[0]} toRange={date[1]} />
      )}
      <Box component='span' mx='10px'></Box>
      <RangeDisplay fromRange={timeSlot[0]} toRange={timeSlot[1]} />
    </>
  );
};
