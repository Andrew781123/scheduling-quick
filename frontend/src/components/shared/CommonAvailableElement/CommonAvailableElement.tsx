import React, { useMemo } from "react";
import { TimeAvailable } from "../../../../../types";
import { DateAndTimeSlotDisplay } from "../../../shared/conponents/DateAndTimeSlotDisplay";
import "./CommonAvailableElement.scss";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { DateWithIcon } from "./DateWithIcon";
import { TImeSlotWithIcon } from "./TimeSlotWithIcon";
import { Box } from "@material-ui/core";

interface CommonAvailableElementProps {
  index: number;
  date: string;
  timeSlotIndex: number;
  commonAvailable: TimeAvailable;
  participantCount: number;
}

export const CommonAvailableElement: React.FC<CommonAvailableElementProps> = props => {
  const {
    index,
    date,
    timeSlotIndex,
    commonAvailable,
    participantCount
  } = props;

  const [timeSlot, availablePeople] = useMemo(() => {
    const timeSlot = commonAvailable[date][timeSlotIndex];
    const availablePeople = commonAvailable[date][timeSlotIndex][2];

    return [timeSlot, availablePeople];
  }, [commonAvailable, date, timeSlotIndex]);

  const elementBackgroundColor =
    participantCount == availablePeople.length ? "#b3ffc7" : "#ffb3b3";

  const elementStyle = {
    backgroundColor: elementBackgroundColor
  };

  return (
    <div className='common_available_element'>
      <DateWithIcon date={date} />

      <Box my={0.7} />

      <TImeSlotWithIcon fromTime={timeSlot[0]} toTime={timeSlot[1]} />

      <Box my={0.7} />

      <div className='icon_with_data'>
        <PeopleAltIcon />{" "}
        {availablePeople.map((name, index) => {
          return (
            <span key={index}>
              {" "}
              {name}
              {index < availablePeople.length - 1 && ","}
            </span>
          );
        })}
      </div>
    </div>
  );
};
