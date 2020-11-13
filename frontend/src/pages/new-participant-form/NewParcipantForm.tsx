import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";

interface routeParams {
  id: string;
}

interface routeStates {
  hasFilledInForm: boolean;
}

interface NewParcipantFormProps
  extends RouteComponentProps<routeParams, any, routeStates> {}

export const NewParcipantForm: React.FC<NewParcipantFormProps> = props => {
  //Todo: when submit form, update local storage

  const {
    match: {
      params: { id: eventId }
    },
    location: {
      state: { hasFilledInForm }
    }
  } = props;

  return <h1>New participant form for evenId: {eventId}</h1>;
};
