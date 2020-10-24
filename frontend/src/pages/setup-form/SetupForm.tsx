import React, { useReducer } from "react";
import { Header } from "../../components/shared/Header";
import { DateAndTimeInput } from "../../components/shared/time-picker/DateAndTimeInput";
import { TimePicker } from "../../components/shared/time-picker/TimePicker";
import { UserInput } from "../../components/shared/UserInput";
import setupInfoReducer from "./setupInfoReducer";

interface SetupFormProps {}

export interface IsetupInfo {
  organizerName: string;
  period: Map<string, [string, string]>;
}

const initialSetupInfo: IsetupInfo = {
  organizerName: "",
  period: new Map()
};

export const SetupForm: React.FC<SetupFormProps> = props => {
  const [setupInfo, dispatch] = useReducer(setupInfoReducer, initialSetupInfo);

  const selectDate = (date: string) => {
    dispatch({ type: "SELECT_DATE", date });
  };

  return (
    <div>
      <Header title='Setup Event' />
      <UserInput label='Name of organizer' placeholder='Enter name' />
      <UserInput label='Venue' placeholder='Enter venue of event' />
      <DateAndTimeInput selectDate={selectDate} />
    </div>
  );
};
