import React from "react";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { RangeDisplay } from "../../../shared/conponents/RangeDisplay";
interface TimeSlotWithIconProps {
  fromTime: string;
  toTime: string;
  iconColor: string;
}

export const TImeSlotWithIcon: React.FC<TimeSlotWithIconProps> = props => {
  const { fromTime, toTime, iconColor } = props;

  return (
    <div className='icon_with_data'>
      <RangeDisplay
        fromRange={fromTime}
        toRange={toTime}
        icon={<WatchLaterIcon style={{ color: iconColor }} />}
      />
    </div>
  );
};
