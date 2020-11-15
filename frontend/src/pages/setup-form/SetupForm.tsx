import React, { useReducer } from "react";
import { Header } from "../../components/shared/Header";
import { DateAndTimeInput } from "../../components/shared/time-picker/DateAndTimeInput";
import setupInfoReducer from "./setupInfoReducer";
import { Moment } from "moment";
import {
  dateRangeState,
  periodState,
  setupInfo,
  timeRangeState
} from "./types";
import { IEvent } from "../../../../types";
import { Button, TextField } from "@material-ui/core";
import { formatPeriods } from "./utils";
import axios from "../../api/proxy";
import * as H from "history";

interface SetupFormProps {
  history: H.History;
}

const initialSetupInfo: setupInfo = {
  organizerName: "",
  venue: "",
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
  ],
  linkPassword: "",
  authPassword: ""
};

export const SetupForm: React.FC<SetupFormProps> = props => {
  const [setupInfo, dispatch] = useReducer(setupInfoReducer, initialSetupInfo);

  const {
    periods,
    organizerName,
    venue,
    linkPassword,
    authPassword
  } = setupInfo;

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

  const hanleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name: textField, value: text }
    } = e;
    dispatch({ type: "TEXT_INPUT", textField, text });
  };

  const submitForm = async () => {
    const formattedPeriods = formatPeriods(periods);

    const newEvent: IEvent = {
      info: {
        organizer: organizerName,
        venue: {
          name: venue
        }
      },
      periods: formattedPeriods,
      participants: [],
      commonDate: null
    };

    try {
      const res = await axios.post("/events", newEvent);

      props.history.push({
        pathname: "/events/new/success",
        state: { eventId: res.data.eventId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header title='Setup Event' />

      <div>
        <TextField
          value={organizerName}
          name='organizerName'
          onChange={hanleTextInput}
          label='Name of organizer'
          placeholder='Enter name'
          required={true}
        />
      </div>
      <div>
        <TextField
          value={venue}
          name='venue'
          onChange={hanleTextInput}
          label='Venue'
          placeholder='Enter venue of event'
        />
      </div>
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

      <div>
        <div>
          <TextField
            value={linkPassword}
            name='linkPassword'
            onChange={hanleTextInput}
            label='Set password for link (optional)'
          />
        </div>
        <div>
          <TextField
            value={authPassword}
            name='authPassword'
            onChange={hanleTextInput}
            label='Set password for link (optional)'
          />
        </div>
      </div>

      <Button variant='contained' onClick={submitForm}>
        Next
      </Button>
    </div>
  );
};
