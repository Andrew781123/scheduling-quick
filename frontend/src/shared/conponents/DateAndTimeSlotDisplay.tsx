import { Box } from "@material-ui/core";
import React from "react";
import { dateRange, timeRange } from "../../../../types";
import { RangeDisplay } from "./RangeDisplay";
import EventIcon from "@material-ui/icons/Event";
import { WatchLater } from "@material-ui/icons";

interface DateAndTimeSlotDisplayProps {
  date: string | dateRange;
  timeSlot: timeRange;
}

export const DateAndTimeSlotDisplay: React.FC<DateAndTimeSlotDisplayProps> = props => {
  const { date, timeSlot } = props;

  return (
    <>
      <div className='icon_with_data'>
        {typeof date === "string" ? (
          <h3>{date}</h3>
        ) : (
          <RangeDisplay
            fromRange={date[0]}
            toRange={date[1]}
            icon={<EventIcon />}
          />
        )}
      </div>
      <RangeDisplay
        fromRange={timeSlot[0]}
        toRange={timeSlot[1]}
        icon={<WatchLater />}
      />
    </>
  );
};
