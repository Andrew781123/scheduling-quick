import React, { useMemo } from "react";
import { TimeAvailable } from "../../../../../types";
import "./CommonAvailableElement.css";

interface CommonAvailableElementProps {
  index: number;
  date: string;
  timeSlotIndex: number;
  commonAvailable: TimeAvailable;
}

export const CommonAvailableElement: React.FC<CommonAvailableElementProps> = props => {
  const { index, date, timeSlotIndex, commonAvailable } = props;

  const [timeSlot, availablePeople] = useMemo(() => {
    const timeSlot = commonAvailable[date][timeSlotIndex];
    const availablePeople = commonAvailable[date][timeSlotIndex][2];

    return [timeSlot, availablePeople];
  }, [commonAvailable, date, timeSlotIndex]);

  return (
    <div className='common_available_element'>
      <h3>
        #{index}: {date}
      </h3>
      <h3>
        Time: {timeSlot[0]} - {timeSlot[1]}
      </h3>
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
