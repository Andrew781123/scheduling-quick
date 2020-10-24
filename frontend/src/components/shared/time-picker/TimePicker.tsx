import React from "react";
import { DownArrow } from "./DownArrow";
import { UpArrow } from "./UpArrow";

interface TimePickerProps {}

export const TimePicker: React.FC<TimePickerProps> = props => {
  return (
    <div>
      <DownArrow />
      <UpArrow />
    </div>
  );
};
