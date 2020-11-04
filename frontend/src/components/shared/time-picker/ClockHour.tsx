import React from "react";
import { ClockCharacter } from "./ClockCharacter";
import { DownArrow } from "./DownArrow";
import { UpArrow } from "./UpArrow";

interface ClockHourProps {
  size: string;
  character: string;
  interval: number;
}

export const ClockHour: React.FC<ClockHourProps> = props => {
  const { character } = props;

  return (
    <div className='clock-character-container hour'>
      <UpArrow />
      <ClockCharacter character={character} size={"5rem"} />
      <DownArrow />
    </div>
  );
};
