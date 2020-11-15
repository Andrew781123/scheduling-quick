import { Button } from "@material-ui/core";
import React, { useLayoutEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";

interface routeProps {
  id: string;
}

interface EventDashboardProps extends RouteComponentProps<routeProps> {}

export const EventDashboard: React.FC<EventDashboardProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    history
  } = props;

  // useLayoutEffect(() => {
  //   const hasFilledInForm: string | null = localStorage.getItem(
  //     "HAS_FILLED_IN_FORM"
  //   );
  //   if (!hasFilledInForm) {
  //     history.replace({
  //       pathname: `/events/${eventId}/new-participant`,
  //       state: { hasFilledInForm: false }
  //     });
  //   }
  // }, []);

  const hasFilledInForm: string | null = localStorage.getItem(
    "HAS_FILLED_IN_FORM"
  );

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
      </>
    );
};
