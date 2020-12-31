import React from "react";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { RangeDisplay } from "../../../shared/conponents/RangeDisplay";
interface TimeSlotWithIconProps {
  fromTime: string;
  toTime: string;
}

export const TImeSlotWithIcon: React.FC<TimeSlotWithIconProps> = props => {
  const { fromTime, toTime } = props;

  return (
    <div className='icon_with_data'>
      <WatchLaterIcon />
      <RangeDisplay fromRange={fromTime} toRange={toTime} />
    </div>
  );
};
