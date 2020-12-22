import { Button } from "@material-ui/core";
import { common } from "@material-ui/core/colors";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { EventContext } from "../../context/event-context/EventProvider";

interface routeProps {
  id: string;
}

interface EventDashboardProps extends RouteComponentProps<routeProps> {}

const hasFilledInForm: string | null = localStorage.getItem(
  "HAS_FILLED_IN_FORM"
);

export const EventDashboard: React.FC<EventDashboardProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    history
  } = props;

  const { event, fetchEvent } = useContext(EventContext);
  const { commonAvailable } = event;

  console.log(commonAvailable);
  useEffect(() => {
    if (!commonAvailable) {
      // fetchEvent(event._id.toString());
    }
  }, []);

  if (!hasFilledInForm) {
    return (
      <Redirect
        to={{
          pathname: `/events/${eventId}/new-participant`,
          state: { hasFilledInForm: false }
        }}
      />
    );
  } else
    return (
      <>
        <h1>Dashboard</h1>
        <h2>id: {eventId}</h2>
        <h3>Common available: {commonAvailable}</h3>
        <Button
          onClick={() => {
            history.push({
              pathname: `/events/${eventId}/new-participant`,
              state: { hasFilledInForm: true }
            });
          }}
        >
          Go to form
        </Button>
        <Button onClick={() => localStorage.removeItem("HAS_FILLED_IN_FORM")}>
          Clear local storage
        </Button>
      </>
    );
};
