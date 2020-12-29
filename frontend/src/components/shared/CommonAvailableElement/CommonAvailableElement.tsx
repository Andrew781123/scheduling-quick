import React, { useMemo } from "react";
import { TimeAvailable } from "../../../../../types";
import { DateAndTimeSlotDisplay } from "../../../shared/conponents/DateAndTimeSlotDisplay";
import "./CommonAvailableElement.css";

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
    <div className='common_available_element' style={elementStyle}>
      <h3>
        #{index}: {date}
      </h3>

      <DateAndTimeSlotDisplay
        date={date}
        timeSlot={[timeSlot[0], timeSlot[1]]}
      />

      <h3>
        Available People:{" "}
        {availablePeople.map((name, index) => {
          return (
            <span key={index}>
              {" "}
              {name}
              {index < availablePeople.length - 1 && ","}
            </span>
          );
        })}
      </h3>
    </div>
  );
};
