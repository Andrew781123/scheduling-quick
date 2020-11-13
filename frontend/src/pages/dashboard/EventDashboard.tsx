import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface routeProps {
  id: string;
}

interface EventDashboardProps extends RouteComponentProps<routeProps> {}

export const EventDashboard: React.FC<EventDashboardProps> = props => {
  const {
    match: { params }
  } = props;

  return (
    <>
      <h1>Dashboard</h1>
      <h2>id: {params.id}</h2>
    </>
  );
};
