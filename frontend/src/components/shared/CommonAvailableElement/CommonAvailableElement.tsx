import React, { useMemo } from "react";
import { TimeAvailable } from "../../../../../types";
import "./CommonAvailableElement.scss";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { DateWithIcon } from "./DateWithIcon";
import { TImeSlotWithIcon } from "./TimeSlotWithIcon";
import { Box } from "@material-ui/core";
import { spawn } from "child_process";
import { PeopleList } from "./PeopleList";
import Divider from "@material-ui/core/Divider";

interface CommonAvailableElementProps {
  date: string;
  timeSlotIndex: number;
  commonAvailable: TimeAvailable;
  participantCount: number;
  participantList: string[];
  timeSlotIconColor: string;
}

export const CommonAvailableElement: React.FC<CommonAvailableElementProps> = props => {
  const {
    date,
    timeSlotIndex,
    commonAvailable,
    timeSlotIconColor,
    participantList
  } = props;

  const [timeSlot, availablePeople, unavailablePeople] = useMemo(() => {
    const timeSlot = commonAvailable[date][timeSlotIndex];
    const availablePeople = commonAvailable[date][timeSlotIndex][2];

    const unavailablePeople = participantList.filter(
      participant => !availablePeople.includes(participant)
    );

    return [timeSlot, availablePeople, unavailablePeople];
  }, [commonAvailable, date, timeSlotIndex]);

  return (
    <div className='common_available_element'>
      <div className='element_date_and_time'>
        <DateWithIcon date={date} />

        <Box mx={0.7} component='span' />

        <TImeSlotWithIcon
          fromTime={timeSlot[0]}
          toTime={timeSlot[1]}
          iconColor={timeSlotIconColor}
        />
      </div>

      <Box my={0.5} />
      <Divider />
      <Box my={1} />

      <div className='people_lists'>
        <PeopleList peopleList={availablePeople} available />
        <Divider orientation='vertical' component='span' flexItem />
        <PeopleList peopleList={unavailablePeople} />
      </div>
    </div>
  );
};
