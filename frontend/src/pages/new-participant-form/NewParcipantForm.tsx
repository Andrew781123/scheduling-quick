import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "@material-ui/core";
import { EventContext } from "../../context/event-context/EventProvider";

interface routeParams {
  id: string;
}

interface routeStates {
  hasFilledInForm?: boolean;
}

interface NewParcipantFormProps
  extends RouteComponentProps<routeParams, any, routeStates> {}

export const NewParcipantForm: React.FC<NewParcipantFormProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    location: {
      //hasFilledInForm is default to false because we can't determine if the user has filled in the form or not if he manually reach this route
      state: { hasFilledInForm = false }
    }
  } = props;

  const { fetchEvent, event } = useContext(EventContext);

  useEffect(() => {
    fetchEvent(eventId);
  }, []);

  const submitForm = () => {
    if (!hasFilledInForm) {
      localStorage.setItem("HAS_FILLED_IN_FORM", "true");
    }
  };

  return (
    <div>
      <h1>New participant form for evenId: {eventId}</h1>
      {event.info && <h1>{event.info.organizer}</h1>}
      <Button
        onClick={() => localStorage.setItem("HAS_FILLED_IN_FORM", "true")}
      >
        Set local storage
      </Button>
    </div>
  );
};
