import React, { useReducer } from "react";
import { Header } from "../../components/shared/Header";
import { DateAndTimeInput } from "../../components/shared/time-picker/DateAndTimeInput";
import { UserInput } from "../../components/shared/UserInput";
import setupInfoReducer from "./setupInfoReducer";
import { period, dateRange } from "../../shared/types";
import moment from "moment";

interface SetupFormProps {}

export interface IsetupInfo {
  organizerName: string;
  periods: period[];
  periodCount: number;
}

const initialSetupInfo: IsetupInfo = {
  organizerName: "",
  periods: [
    {
      dateRange: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
      timeRange: [0o000, 0o000]
    }
  ],
  periodCount: 1
};

export const SetupForm: React.FC<SetupFormProps> = props => {
  const [setupInfo, dispatch] = useReducer(setupInfoReducer, initialSetupInfo);

  const { periods, periodCount } = setupInfo;

  const selectDate = (dateRange: dateRange, index: number) => {
    dispatch({ type: "SELECT_DATE", dateRange, index });
  };

  const renderDateAndTimeInputComponent = () => {
    let components = [];
    for (let i = 0; i < periodCount; i++) {
      components.push(
        <DateAndTimeInput
          selectDate={selectDate}
          period={periods[i]}
          index={i}
          key={i}
        />
      );
    }
    return components;
  };

  return (
    <div>
      <Header title='Setup Event' />
      <UserInput label='Name of organizer' placeholder='Enter name' />
      <UserInput label='Venue' placeholder='Enter venue of event' />
      {renderDateAndTimeInputComponent()}
      <button onClick={() => dispatch({ type: "ADD_DATE_AND_TIME_COMPONENT" })}>
        Add
      </button>
    </div>
  );
};
