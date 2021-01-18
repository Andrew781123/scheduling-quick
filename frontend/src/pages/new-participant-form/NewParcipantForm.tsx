import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { EventContext } from "../../context/event-context/EventProvider";
import {
  DateRangeState,
  EventInfo,
  NewParticipantDateAndTimeInput,
  SelectedDateMap,
  timeSlot,
  TwoDimentionalMap
} from "./types";
import moment, { Moment } from "moment";
import { AvailableTimeSlotsInput } from "./AvailableTimeSlotsInput";
import {
  computeMinMaxDate,
  findSmallestNotSelectedDate,
  generateRequestData,
  validateInput,
  checkAnyErrorInMap
} from "./utils";
import axios from "../../api/proxy";
import "./NewParticipantForm.scss";
import { EventInfoBlock } from "./EventInfoBlock";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import { PageHeader } from "../../shared/conponents/PageHeader";
import Alert from "@material-ui/lab/Alert";
import { NewParticipantFormReducer } from "./NewParticipantFormReducer";
import { DATE_STRING, TIME_STRING } from "../../shared/constants";
import { ErrorContext } from "../../context/error-context/ErrorProvider";

interface routeParams {
  id: string;
}

type routeStates = {};

interface NewParcipantFormProps
  extends RouteComponentProps<routeParams, any, routeStates> {}

export const initialTimeSlot: timeSlot = {
  fromTime: moment("0000"),
  toTime: moment("0100", TIME_STRING)
};

export const initialDateAndTimeInput = {
  dateRange: {
    fromDate: moment(),
    toDate: moment(),
    isRange: false
  },
  timeSlots: [initialTimeSlot]
};
export const initialDateAndTimeInputs: NewParticipantDateAndTimeInput = [
  initialDateAndTimeInput
];

export const NewParcipantForm: React.FC<NewParcipantFormProps> = props => {
  const {
    match: {
      params: { id: eventId }
    }
  } = props;

  const history = useHistory();

  //useContext
  const {
    fetchEvent,
    updateEventAfterUserSubmit,
    event,
    loadingEvent
  } = useContext(EventContext);
  const { periods } = event;

  const { pushErrors, clearErrors } = useContext(ErrorContext);

  const minMaxDate = useMemo(() => {
    // 1. wait for the event be fetched.
    if (periods) {
      if (periods.length === 0) return [moment(), moment()];

      return computeMinMaxDate(periods);
    }

    return [null, null];
  }, [periods]);
  const [isMinDateSet, setIsMinDateSet] = useState(false);

  //this variable is for display event info
  const eventInfo: EventInfo = {
    venue: event.info.venue.name,
    organizer: event.info.organizer,
    evnetPossibleDataAndTime: event.periods,
    participantCount: event.participants.length,
    eventDuration: event.duration
  };

  const [dateAndTimeInputs, dispatch] = useReducer(
    NewParticipantFormReducer,
    initialDateAndTimeInputs
  );

  const [participantName, setParticaipantName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [areDatesValid, setAreDatesValid] = useState<{
    [key: string]: boolean;
  }>({});

  const [areTimeSlotsValid, setAreTimeSlosValid] = useState<TwoDimentionalMap>(
    {}
  );

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [selectedDatesMap, setSelectedDatesMap] = useState<SelectedDateMap>({});

  // useEffect(() => {
  //   console.log(selectedDatesMap);
  // }, [selectedDatesMap]);

  //Effects
  useEffect(() => {
    fetchEvent(eventId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const minDate = minMaxDate[0];
    // 2. wait for the value of minMaxDate be computed
    if (minDate) {
      dispatch({ type: "INITIALIZE_MIN_DATE", minDate: minDate });

      const minDateString = minDate.format(DATE_STRING);

      //initialize selectedDateMap
      setSelectedDatesMap({ [minDateString]: true });
    }
  }, [minMaxDate![0]]);

  useEffect(() => {
    // 3. wait the the dateRange be set
    const startDate = periods[0].dateRange[0];

    if (moment(startDate, DATE_STRING).diff(moment()) > 0) {
      setIsMinDateSet(true);
    }
  }, [periods[0].dateRange[0]]);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParticaipantName(e.target.value);
  };

  const selectDate = (
    date: Moment,
    index: number,
    dateRangeField: keyof DateRangeState<Moment>
  ) => {
    dispatch({ type: "SELECT_DATE", date, index, dateRangeField });
  };

  const enableRange = (dateIndex: number, newToDate: Moment) => {
    dispatch({ type: "ENABLE_RANGE", dateIndex, newToDate });
  };

  const disableRange = (dateIndex: number, fromDate: Moment) => {
    dispatch({ type: "DISABLE_RANGE", dateIndex, fromDate });
  };

  const selectTime = (
    timeField: keyof timeSlot,
    time: Moment | null,
    dateIndex: number,
    timeIndex: number
  ) => {
    dispatch({ type: "SELECT_TIME", timeField, time, dateIndex, timeIndex });
  };

  const autoSetToTime = (
    fromTime: Moment,
    dateIndex: number,
    timeIndex: number
  ) => {
    const fromTimeClone = fromTime.clone();
    const toTime = fromTimeClone.add(1, "hour");

    dispatch({ type: "AUTO_SET_TO_TIME", toTime, dateIndex, timeIndex });
  };

  const autoSetToDate = (fromDate: Moment, dateIndex: number) => {
    const fromDateClone = fromDate.clone();
    const toDate = fromDateClone.add(1, "day");

    dispatch({ type: "AUTO_SET_TO_DATE", toDate, dateIndex });
  };

  const addDateAndTimeInput = () => {
    //fromDate of the newly added input block
    const fromDate = findSmallestNotSelectedDate(
      selectedDatesMap,
      minMaxDate[0]!,
      minMaxDate[1]!
    );

    if (fromDate) {
      addOrRemoveKeyFromSelectedDateMap([fromDate, fromDate], true, [
        true,
        true
      ]);
      dispatch({ type: "ADD_DATE_AND_TIME_INPUT", fromDate });
    } else {
      pushErrors(["All available dates are input already"]);
    }
  };

  const addTimeSlot = (dateIndex: number) => {
    dispatch({ type: "ADD_TIME_SLOT", dateIndex });
  };

  const deleteDateAndTimeInput = (dateIndex: number) => {
    dispatch({ type: "DELETE_DATE_AND_TIME_INPUT", dateIndex });
  };

  //used when isRange is toggled
  //default will include both value (lower & upper)
  const addOrRemoveKeyFromSelectedDateMap = (
    dateRange: [Moment, Moment],
    doAdd: boolean,
    inclusive: [boolean, boolean]
  ) => {
    const [includeStart, includeEnd] = inclusive;

    const lowerValue = dateRange[0].clone();
    const upperValue = dateRange[1].clone();

    const startValue = includeStart ? lowerValue : lowerValue.add(1, "day");
    const stopValue = includeEnd ? upperValue : upperValue.subtract(1, "day");

    let currentValue = startValue;

    while (currentValue.diff(stopValue, "days") <= 0) {
      const dateString = currentValue.format(DATE_STRING);

      setSelectedDatesMap(map => ({
        ...map,
        [dateString]: doAdd
      }));

      currentValue.add(1, "day");
    }
  };

  const deleteTimeSlot = (dateIndex: number, timeSlotIndex: number) => {
    dispatch({ type: "DELETE_TIME_SLOT", dateIndex, timeSlotIndex });
  };

  const submitForm = async () => {
    clearErrors();
    setNameError(false);
    setDisableSubmitButton(true);

    const errorMessages = validateInput(
      participantName,
      dateAndTimeInputs,
      areDatesValid,
      areTimeSlotsValid
    );
    if (errorMessages.length > 0) {
      if (errorMessages.includes("Name cannot be empty")) setNameError(true);

      pushErrors(errorMessages);

      setDisableSubmitButton(false);

      return;
    }

    const requestData = generateRequestData(participantName, dateAndTimeInputs);

    try {
      const res = await axios.post(
        `/events/${eventId}/participants`,
        requestData
      );

      const {
        newCommonAvailable,
        commonAvailableCategory,
        participants
      } = res.data;
      updateEventAfterUserSubmit(
        newCommonAvailable,
        commonAvailableCategory,
        participants
      );

      history.push({ pathname: `/events/${eventId}/dashboard` });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='page_container'>
      <Alert
        severity='info'
        action={
          <Button
            color='inherit'
            size='small'
            onClick={() =>
              history.push({ pathname: `/events/${eventId}/dashboard` })
            }
          >
            See result
          </Button>
        }
      >
        Already joined?
      </Alert>

      <PageHeader
        icon={<PeopleOutlineOutlinedIcon fontSize='large' />}
        headerText='New participant'
      />

      {event.info && (
        <EventInfoBlock eventInfo={eventInfo} loadingEvent={loadingEvent} />
      )}

      <Box my={5} />

      <div className='new_participant_form_container'>
        <div className='input_block'>
          <h2 className='label primary_label'>Your Info</h2>
          <TextField
            error={nameError}
            helperText={nameError && "empty name"}
            className='text-input'
            value={participantName}
            name='participantName'
            placeholder='Enter name'
            onChange={handleNameInput}
            required={true}
            label='Name'
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div className='input_block'>
          <h2 className='label primary_label'>
            Your available date and time slots
          </h2>
          <div className='new_participant_date_and_time_input'>
            {dateAndTimeInputs.map((input, i) => (
              <div className='sub_input_block can_be_deleted' key={i}>
                {!loadingEvent && isMinDateSet && (
                  <AvailableTimeSlotsInput
                    minDate={minMaxDate[0]!}
                    maxDate={minMaxDate[1]!}
                    dateAndTimeInputLength={dateAndTimeInputs.length}
                    dateAndTimeInput={input}
                    dateIndex={i}
                    selectDate={selectDate}
                    enableRange={enableRange}
                    disableRange={disableRange}
                    selectTime={selectTime}
                    autoSetToTime={autoSetToTime}
                    autoSetToDate={autoSetToDate}
                    addTimeSlot={addTimeSlot}
                    deleteDateAndTimeInput={deleteDateAndTimeInput}
                    deleteTimeSlot={deleteTimeSlot}
                    selectedDatesMap={selectedDatesMap}
                    addOrRemoveKeyFromSelectedDateMap={
                      addOrRemoveKeyFromSelectedDateMap
                    }
                    pushErrors={pushErrors}
                    areDatesValid={areDatesValid}
                    setAreDatesValid={setAreDatesValid}
                    areTimeSlotsValid={areTimeSlotsValid}
                    setAreTimeSlosValid={setAreTimeSlosValid}
                  />
                )}
              </div>
            ))}
          </div>

          <div className='add_one_input_block_button'>
            <Button
              onClick={addDateAndTimeInput}
              variant='contained'
              className='Button'
            >
              Add another date
            </Button>
          </div>
        </div>

        <div className='submit_button_container'>
          <Button
            onClick={submitForm}
            className='proceed_button'
            size='large'
            disabled={disableSubmitButton}
          >
            {disableSubmitButton ? <CircularProgress size={25} /> : "submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
