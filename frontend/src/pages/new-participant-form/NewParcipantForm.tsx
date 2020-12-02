import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { EventContext } from "../../context/event-context/EventProvider";
import { NewParticipantAvailableTimeSlotsState } from "./types";
import moment from "moment";
import { AvailableTimeSlotsInput } from "./AvailableTimeSlotsInput";

interface routeParams {
  id: string;
}

interface routeStates {
  hasFilledInForm?: boolean;
}

interface NewParcipantFormProps
  extends RouteComponentProps<routeParams, any, routeStates> {}

export const initialAvailableTimeSlot = {
  date: moment(),
  fromTime: null,
  toTime: null
};
const initialAvailableTimeSlots: NewParticipantAvailableTimeSlotsState = [
  initialAvailableTimeSlot
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

  const [availableTimeSlots, setAvailableTimeSlots] = useState(
    initialAvailableTimeSlots
  );

  useEffect(() => {
    fetchEvent(eventId);
  }, []);

  const submitForm = () => {
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
          value={""}
          name='participantName'
          placeholder='Enter name'
          required={true}
          label='Name'
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      {availableTimeSlots.map((timeSlot, i) => (
        <AvailableTimeSlotsInput availableTimeSlot={timeSlot} index={i} />
      ))}
    </div>
  );
};
