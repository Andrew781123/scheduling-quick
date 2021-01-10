import React, { useReducer } from "react";
import { DateAndTimeInput } from "../../components/shared/time-picker/DateAndTimeInput";
import setupInfoReducer from "./setupInfoReducer";
import moment, { Moment } from "moment";
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
import { ComponentDivider } from "../../shared/conponents/ComponentDivider";
import { PageHeader } from "../../shared/conponents/PageHeader";
import EventIcon from "@material-ui/icons/Event";
import "./SetupForm.scss";

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
        fromDate: moment(),
        toDate: moment()
      },
      timeRange: {
        fromTime: moment("0000"),
        toTime: moment("0000")
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
    venue
    //linkPassword,
    //authPassword
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
    <div className='page_container'>
      <PageHeader
        icon={<EventIcon fontSize='large' />}
        headerText='Setup an Event'
      />

      <div className='input_block'>
        <h2 className='label primary_label'>Event Info</h2>
        <div className='sub_input_block'>
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
            className='input_field'
          />
          <TextField
            value={venue}
            name='venue'
            onChange={hanleTextInput}
            label='Venue'
            placeholder='Enter venue of event'
            InputLabelProps={{
              shrink: true
            }}
            className='input_field'
          />
          <ComponentDivider />
          <div>
            <InputLabel id='event_min_duration'>
              Event minimum duration
            </InputLabel>
            <div className='min_duration_selects'>
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
              <span className='min_duration_select_unit'>hours</span>

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
              <span className='min_duration_select_unit'>minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className='input_block'>
        <h2 className='label primary_label'>Possible date and time</h2>
        <div className='sub_input_block'>
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

          {/* add time slot button */}
          {/* <button
            onClick={() => dispatch({ type: "ADD_DATE_AND_TIME_COMPONENT" })}
          >
            Add
          </button> */}
        </div>
      </div>

      {/* auth (may be later) */}
      {/* <div>
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
      </div> */}

      <div className='submit_button_container'>
        <Button variant='contained' onClick={submitForm} className='Button'>
          Next
        </Button>
      </div>
    </div>
  );
};
