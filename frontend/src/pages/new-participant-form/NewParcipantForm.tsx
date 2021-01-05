import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { EventContext } from "../../context/event-context/EventProvider";
import { EventInfo, NewParticipantDateAndTimeInput, timeSlot } from "./types";
import moment, { Moment } from "moment";
import { AvailableTimeSlotsInput } from "./AvailableTimeSlotsInput";
import { generateRequestData, validateInput } from "./utils";
import axios from "../../api/proxy";
import "./NewParticipantForm.scss";
import { EventInfoBlock } from "./EventInfoBlock";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import { PageHeader } from "../../shared/conponents/PageHeader";
import Alert from "@material-ui/lab/Alert";

interface routeParams {
  id: string;
}

type routeStates = {
  hasFilledInForm?: boolean;
};

interface NewParcipantFormProps
  extends RouteComponentProps<routeParams, any, routeStates> {}

const initialTImeSlot: timeSlot = {
  fromTime: moment("0000"),
  toTime: moment("0000")
};

export const initialDateAndTimeInput = {
  date: moment(),
  timeSlots: [initialTImeSlot]
};
const initialDateAndTimeInputs: NewParticipantDateAndTimeInput = [
  initialDateAndTimeInput
];

export const NewParcipantForm: React.FC<NewParcipantFormProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    location: {
      //hasFilledInForm is default to false because we can't determine if the user has filled in the form or not if he manually reach this route
      state = { hasFilledInForm: false }
    }
  } = props;

  const history = useHistory();

  const { fetchEvent, updateEventAfterUserSubmit, event } = useContext(
    EventContext
  );
  const { periods } = event;
  //this variable is for display event info
  const eventInfo: EventInfo = {
    venue: event.info.venue.name,
    organizer: event.info.organizer,
    evnetPossibleDataAndTime: event.periods,
    participantCount: event.participants.length,
    eventDuration: event.duration
  };

  const [dateAndTimeInputs, setDateAndTimeInputs] = useState(
    initialDateAndTimeInputs
  );

  const [participantName, setParticaipantName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  useEffect(() => {
    fetchEvent(eventId);
    // eslint-disable-next-line
  }, []);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParticaipantName(e.target.value);
  };

  const selectDate = (date: Moment, index: number) => {
    setDateAndTimeInputs(dateAndTimeInputs => {
      return dateAndTimeInputs.map((input, i) => {
        if (i !== index) return input;
        return {
          ...input,
          date: date
        };
      });
    });
  };

  const selectTime = (
    timeField: keyof timeSlot,
    time: Moment | null,
    dateIndex: number,
    timeIndex: number
  ) => {
    setDateAndTimeInputs(dateAndTimeInputs =>
      dateAndTimeInputs.map((dateAndTimeInput, i) => {
        if (i !== dateIndex) return dateAndTimeInput;
        return {
          ...dateAndTimeInput,
          timeSlots: dateAndTimeInput.timeSlots.map((timeSlot, j) => {
            if (j !== timeIndex) return timeSlot;
            return {
              ...timeSlot,
              [timeField]: time
            };
          })
        };
      })
    );
  };

  const addDateAndTimeInput = () => {
    setDateAndTimeInputs(inputs => [...inputs, initialDateAndTimeInput]);
  };

  const addTimeSlot = (dateIndex: number) => {
    setDateAndTimeInputs(inputs =>
      inputs.map((input, i) => {
        if (dateIndex !== i) return input;
        return {
          ...input,
          timeSlots: [...input.timeSlots, initialTImeSlot]
        };
      })
    );
  };

  const deleteDateAndTimeInput = (dateIndex: number) => {
    setDateAndTimeInputs(inputs =>
      inputs.filter((input, i) => i !== dateIndex)
    );
  };

  const deleteTimeSlot = (dateIndex: number, timeSlotIndex: number) => {
    setDateAndTimeInputs(inputs =>
      inputs.map((input, i) => {
        if (dateIndex !== i) return input;

        return {
          ...input,
          timeSlots: input.timeSlots.filter(
            (timeSlot, j) => j !== timeSlotIndex
          )
        };
      })
    );
  };

  const submitForm = async () => {
    setDisableSubmitButton(true);

    const areInputsValid = validateInput(participantName);
    if (!areInputsValid) {
      setNameError(true);
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

    if (!state.hasFilledInForm) {
      localStorage.setItem("HAS_FILLED_IN_FORM", "true");
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

      {event.info && <EventInfoBlock eventInfo={eventInfo} />}

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
              <div className='sub_input_block can_be_deleted'>
                <AvailableTimeSlotsInput
                  key={i}
                  periods={periods}
                  dateAndTimeInputLength={dateAndTimeInputs.length}
                  dateAndTimeInput={input}
                  dateIndex={i}
                  selectDate={selectDate}
                  selectTime={selectTime}
                  addTimeSlot={addTimeSlot}
                  deleteDateAndTimeInput={deleteDateAndTimeInput}
                  deleteTimeSlot={deleteTimeSlot}
                />
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
