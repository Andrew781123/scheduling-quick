import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface EventLinkPageProps {}

interface LocationState {
  eventId: string;
}

export const EventLinkPage: React.FC<
  EventLinkPageProps & RouteComponentProps<{}, any, LocationState | any>
> = props => {
  const eventId = props.location.state.eventId;

  const link = useMemo(() => {
    return `http://localhost:3000/events/${eventId}`;
  }, [eventId]);

  return (
    <>
      <h1>Link to dashboard of event</h1>
      <Link
        to={{
          pathname: `/events/${eventId}/dashboard`
        }}
      >
        {link}
      </Link>
    </>
  );
};
