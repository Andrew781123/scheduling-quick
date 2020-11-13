import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";

interface routeParams {
  id: string;
}

interface NewParcipantFormProps extends RouteComponentProps<routeParams> {
  history: H.History;
}

export const NewParcipantForm: React.FC<NewParcipantFormProps> = props => {
  const {
    match: {
      params: { id: eventId }
    }
  } = props;

  return <h1>New participant form for evenId: {eventId}</h1>;
};
