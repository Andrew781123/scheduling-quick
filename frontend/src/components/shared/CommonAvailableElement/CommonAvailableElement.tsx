import React, { useMemo } from "react";
import { TimeAvailable } from "../../../../../types";
import "./CommonAvailableElement.scss";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { DateWithIcon } from "./DateWithIcon";
import { TImeSlotWithIcon } from "./TimeSlotWithIcon";
import { Box } from "@material-ui/core";
import { spawn } from "child_process";

interface CommonAvailableElementProps {
  index: number;
  date: string;
  timeSlotIndex: number;
  commonAvailable: TimeAvailable;
  participantCount: number;
  timeSlotIconColor: string;
  peopleIconColor: string;
}

export const CommonAvailableElement: React.FC<CommonAvailableElementProps> = props => {
  const {
    date,
    timeSlotIndex,
    commonAvailable,
    index,
    timeSlotIconColor,
    peopleIconColor
  } = props;

  const [timeSlot, availablePeople] = useMemo(() => {
    const timeSlot = commonAvailable[date][timeSlotIndex];
    const availablePeople = commonAvailable[date][timeSlotIndex][2];

    return [timeSlot, availablePeople];
  }, [commonAvailable, date, timeSlotIndex]);

  return (
    <div className='common_available_element'>
      <DateWithIcon date={date} />

      <Box my={0.7} />

      <TImeSlotWithIcon
        fromTime={timeSlot[0]}
        toTime={timeSlot[1]}
        iconColor={timeSlotIconColor}
      />

      <Box my={0.7} />

      <div className='icon_with_data'>
        <PeopleAltIcon style={{ color: peopleIconColor }} />{" "}
        {availablePeople.map((name, index) => {
          return (
            <span key={index}>
              {" "}
              {name}
              {index < availablePeople.length - 1 && ","}
              {index <= availablePeople.length - 2 && <span>&nbsp;</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
};
