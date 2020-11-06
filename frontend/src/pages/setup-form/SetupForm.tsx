import React, { useReducer } from "react";
import { Header } from "../../components/shared/Header";
import { DateAndTimeInput } from "../../components/shared/time-picker/DateAndTimeInput";
import { UserInput } from "../../components/shared/UserInput";
import setupInfoReducer from "./setupInfoReducer";
import moment, { Moment } from "moment";
import {
  dateRangeState,
  periodState,
  setupInfo,
  timeRangeState
} from "./types";

interface SetupFormProps {}

const initialSetupInfo: setupInfo = {
  organizerName: "",
  periods: [
    {
      dateRange: {
        fromDate: null,
        toDate: null
      },
      timeRange: {
        fromTime: null,
        toTime: null
      }
    }
  ]
};

export const SetupForm: React.FC<SetupFormProps> = props => {
  const [setupInfo, dispatch] = useReducer(setupInfoReducer, initialSetupInfo);

  const { periods } = setupInfo;

  const selectPeriod = (
    periodField: keyof periodState,
    fromToField: keyof dateRangeState | keyof timeRangeState,
    date: Moment,
    index: number
  ) => {
    dispatch({
      type: "FROM_DATE_SELECT",
      periodField,
      fromToField,
      date,
      index
    });
  };

  return (
    <div>
      <Header title='Setup Event' />
      <UserInput label='Name of organizer' placeholder='Enter name' />
      <UserInput label='Venue' placeholder='Enter venue of event' />
      {periods.map((period, i) => {
        return (
          <DateAndTimeInput
            selectPeriod={selectPeriod}
            period={period}
            index={i}
            key={i}
          />
        );
      })}
      <button onClick={() => dispatch({ type: "ADD_DATE_AND_TIME_COMPONENT" })}>
        Add
      </button>
    </div>
  );
};
