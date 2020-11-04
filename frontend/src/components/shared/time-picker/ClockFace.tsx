import React, { useMemo } from "react";
import { timeRange } from "../../../shared/types";
import { ClockCharacter } from "./ClockCharacter";
import { ClockHour } from "./ClockHour";
import { DownArrow } from "./DownArrow";
import { UpArrow } from "./UpArrow";

interface ClockFaceProps {
  startTime: string;
  endTime: string;
  index: number;
  timeChange: (timeRange: timeRange, index: number) => void;
}

const padNumber = (number: number): string => {
  let numString = number.toString();

  if (numString.length == 1) {
    numString = "0" + numString;
  }

  return numString;
};

export const ClockFace: React.FC<ClockFaceProps> = props => {
  const { startTime, endTime, index, timeChange } = props;

  // const zeroPaddedStartHour = padNumber(startHour);
  const startHour = useMemo(() => {
    return startTime.slice(0, 2);
  }, [startTime[0], startTime[1]]);

  const startMinute = useMemo(() => {
    return startTime.slice(2);
  }, [startTime[2], startTime[3]]);

  const endHour = useMemo(() => {
    return endTime.slice(0, 2);
  }, [endTime[2], endTime[3]]);

  const endMinute = useMemo(() => {
    return endTime.slice(2);
  }, [endTime[2], endTime[3]]);

  return (
    <div className='clock-face-container'>
      <div className='clock-face'>
        <ClockHour size={"4rem"} character={startHour} interval={1} />
        <div id='clock-colon' style={{ fontSize: "5rem" }}>
          :
        </div>
        <ClockHour size={"4rem"} character={startMinute} interval={15} />
      </div>
    </div>
  );
};
