import React, { useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

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

  useLayoutEffect(() => {
    console.log("redirect");
    history.replace({
      pathname: `/events/${eventId}/new-participant`
    });
    // history.replace();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>id: {eventId}</h2>
    </>
  );
};
