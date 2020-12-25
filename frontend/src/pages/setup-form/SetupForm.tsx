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
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { formatPeriods } from "./utils";
import axios from "../../api/proxy";
import * as H from "history";
import { EVENT_MIN_DURATION_HOURS, EVENT_MIN_DURATION_MIN } from "./constants";

interface SetupFormProps {
  history: H.History;
}

const initialSetupInfo: setupInfo = {
  organizerName: "",
  venue: "",
  duration: {
    durationHour: 0,
    durationMin: 0
  },
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

  const selectDurationHour = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({
      type: "DURATION_SELECT",
      durationField: "durationHour",
      data: event.target.value as number
    });
  };

  const selectDurationMin = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({
      type: "DURATION_SELECT",
      durationField: "durationMin",
      data: event.target.value as number
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
      duration: setupInfo.duration,
      periods: formattedPeriods,
      participants: [],
      commonAvailable: null
    };

    try {
      const res = await axios.post("/events", newEvent);

      props.history.push({
        pathname: "/events/new/success",
        state: { eventId: res.data.eventId }
      });
    } catch (err) {
      console.error(err.message);
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
          placeholder='Enter name'
          required={true}
          label='Name of organizer'
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      <div>
        <TextField
          value={venue}
          name='venue'
          onChange={hanleTextInput}
          label='Venue'
          placeholder='Enter venue of event'
          InputLabelProps={{
            shrink: true
          }}
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
        <InputLabel id='event_min_duration'>Min duration</InputLabel>
        <Select
          labelId='event_min_duration'
          id='min_duration_hour'
          value={setupInfo.duration.durationHour}
          onChange={selectDurationHour}
        >
          {EVENT_MIN_DURATION_HOURS.map(hour => {
            return <MenuItem value={hour}>{hour}</MenuItem>;
          })}
        </Select>
        <span>hours</span>

        <Select
          labelId='event_min_duration'
          id='min_duration_min'
          value={setupInfo.duration.durationMin}
          onChange={selectDurationMin}
        >
          {EVENT_MIN_DURATION_MIN.map(min => {
            return <MenuItem value={min}>{min}</MenuItem>;
          })}
        </Select>
        <span>minutes</span>
      </div>

      <div>
        <div>
          <TextField
            value={linkPassword}
            name='linkPassword'
            onChange={hanleTextInput}
            label='Set password for link (optional)'
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div>
          <TextField
            value={authPassword}
            name='authPassword'
            onChange={hanleTextInput}
            label='Set password for link (optional)'
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>

      <Button variant='contained' onClick={submitForm}>
        Next
      </Button>
    </div>
  );
};
