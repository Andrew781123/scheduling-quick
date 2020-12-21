import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { EventContext } from "../../context/event-context/EventProvider";
import { NewParticipantDateAndTimeInput, timeSlot } from "./types";
import moment, { Moment } from "moment";
import { AvailableTimeSlotsInput } from "./AvailableTimeSlotsInput";
import { generateRequestData } from "./utils";
import axios from "../../api/proxy";

interface routeParams {
  id: string;
}

interface routeStates {
  hasFilledInForm?: boolean;
}

interface NewParcipantFormProps
  extends RouteComponentProps<routeParams, any, routeStates> {}

const initialTImeSlot: timeSlot = {
  fromTime: null,
  toTime: null
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

  const { fetchEvent, event } = useContext(EventContext);

  const [dateAndTimeInputs, setDateAndTimeInputs] = useState(
    initialDateAndTimeInputs
  );

  const [participantName, setParticaipantName] = useState("");

  useEffect(() => {
    fetchEvent(eventId);
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

  const submitForm = async () => {
    const requestData = generateRequestData(participantName, dateAndTimeInputs);

    try {
      const res = await axios.post(`/events/${eventId}/participants`, requestData);
    } catch (err) {
      console.error(err.message);
    }

    if (!state.hasFilledInForm) {
      localStorage.setItem("HAS_FILLED_IN_FORM", "true");
    }
  };

  return (
    <div>
      <h1>New participant form for evenId: {eventId}</h1>
      {event.info && <h1>{event.info.organizer}</h1>}
      <Button
        style={{
          display: "block"
        }}
        onClick={() => localStorage.setItem("HAS_FILLED_IN_FORM", "true")}
      >
        Set local storage
      </Button>

      <div>
        <TextField
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
      {dateAndTimeInputs.map((input, i) => (
        <AvailableTimeSlotsInput
          key={i}
          dateAndTimeInput={input}
          dateIndex={i}
          selectDate={selectDate}
          selectTime={selectTime}
          addTimeSlot={addTimeSlot}
        />
      ))}
      <button onClick={addDateAndTimeInput}>Add one Input Block</button>

      <button onClick={submitForm}>Submit</button>
    </div>
  );
};
