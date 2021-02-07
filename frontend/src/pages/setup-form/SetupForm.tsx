import React, { useContext, useReducer, useState } from "react";
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
  InputLabel,
  CircularProgress
} from "@material-ui/core";
import {
  formatPeriods,
  validateInputOnSubmit,
  validateNameInput
} from "./utils";
import axios from "../../api/proxy";
import * as H from "history";
import { EVENT_MIN_DURATION_HOURS, EVENT_MIN_DURATION_MIN } from "./constants";
import { ComponentDivider } from "../../shared/conponents/ComponentDivider";
import { PageHeader } from "../../shared/conponents/PageHeader";
import EventIcon from "@material-ui/icons/Event";
import "./SetupForm.scss";
import { TIME_STRING } from "../../shared/constants";
import { ErrorContext } from "../../context/error-context/ErrorProvider";
import useOnBlurError from "../../shared/hooks/useOnBlurError";
import { useInputStyles } from "./styles";

interface SetupFormProps {
  history: H.History;
}

const initialSetupInfo: setupInfo = {
  organizerName: "",
  venue: "",
  duration: {
    durationHour: 1,
    durationMin: 0
  },
  periods: [
    {
      dateRange: {
        fromDate: moment(),
        toDate: moment()
      },
      timeRange: {
        fromTime: moment("0000", TIME_STRING),
        toTime: moment("0100", TIME_STRING)
      }
    }
  ],
  linkPassword: "",
  authPassword: "",
  loading: false
};

export const SetupForm: React.FC<SetupFormProps> = props => {
  const [setupInfo, dispatch] = useReducer(setupInfoReducer, initialSetupInfo);

  const {
    periods,
    organizerName,
    venue,
    //linkPassword,
    //authPassword,
    loading
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

  const [arePeriodFieldsValid, setArePeriodFieldsValid] = useState({
    timeRange: true,
    dateRange: true
  });

  const { onBlurErrors, addOnBlurError, clearOnBlurError } = useOnBlurError([
    "organizerName"
  ]);

  const { pushErrors, clearErrors } = useContext(ErrorContext);

  const handleNameOnBlur = () => {
    const error = validateNameInput(organizerName);

    if (error) addOnBlurError("organizerName", error);
    else if (onBlurErrors.organizerName) clearOnBlurError("organizerName");
  };

  const autoSetToTime = (fromTime: Moment) => {
    //need to make a copy because fromTime is passed by reference
    const fromTimeCopy = fromTime.clone();
    const toTime = fromTimeCopy.add(1, "h");

    dispatch({
      type: "AUTO_SET_TO_TIME",
      toTime
    });
  };

  const autoSetToDate = (fromDate: Moment) => {
    //need to make a copy because fromTime is passed by reference
    const fromDateCopy = fromDate.clone();
    const toDate = fromDateCopy.add(1, "d");

    dispatch({
      type: "AUTO_SET_TO_DATE",
      toDate
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
    clearErrors();
    dispatch({ type: "TOGGLE_SETUP_FORM_LOADING" });

    const errors = validateInputOnSubmit(
      organizerName,
      arePeriodFieldsValid,
      onBlurErrors
    );

    if (errors.length > 0) {
      dispatch({ type: "TOGGLE_SETUP_FORM_LOADING" });

      return pushErrors(errors);
    }

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

  const inputClasses = useInputStyles();

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
            onBlur={handleNameOnBlur}
            onFocus={() => clearOnBlurError("organizerName")}
            placeholder='Enter name'
            required={true}
            label='Name of organizer'
            InputLabelProps={{
              shrink: true
            }}
            className='input_field'
            classes={{ root: inputClasses.root }}
            error={onBlurErrors.organizerName ? true : false}
            helperText={onBlurErrors.organizerName}
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
            classes={{ root: inputClasses.root }}
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
                {EVENT_MIN_DURATION_HOURS.map((hour, i) => {
                  return (
                    <MenuItem value={hour} key={i}>
                      {hour}
                    </MenuItem>
                  );
                })}
              </Select>
              <span className='min_duration_select_unit'>hours</span>

              <Select
                labelId='event_min_duration'
                id='min_duration_min'
                value={setupInfo.duration.durationMin}
                onChange={selectDurationMin}
              >
                {EVENT_MIN_DURATION_MIN.map((min, i) => {
                  return (
                    <MenuItem value={min} key={i}>
                      {min}
                    </MenuItem>
                  );
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
                autoSetToTime={autoSetToTime}
                autoSetToDate={autoSetToDate}
                period={period}
                index={i}
                key={i}
                arePeriodFieldsValid={arePeriodFieldsValid}
                setArePeriodFieldsValid={setArePeriodFieldsValid}
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
        <Button
          variant='contained'
          onClick={submitForm}
          className='Button'
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={25} className='spinner' />
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};
