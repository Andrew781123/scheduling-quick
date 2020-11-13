import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../api/proxy";
import { queryString } from "../../../../types";

interface routeParams {
  id: string;
}

interface routeStates {
  hasFilledInForm?: boolean;
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
      state: { hasFilledInForm = true }
    }
  } = props;

  useEffect(() => {
    const queryString: queryString = {
      key: "type",
      value: "form"
    };

    const fetchEventInfo = async () => {
      try {
        const res = await axios.get(
          `/events/${eventId}?${queryString.key}=${queryString.value}`
        );

        console.log(res.data);
      } catch (err) {}
    };

    fetchEventInfo();
  }, []);

  const submitForm = () => {
    if (!hasFilledInForm) {
      localStorage.setItem("HAS_FILLED_IN_FORM", "true");
    }
  };

  return (
    <div>
      <h1>New participant form for evenId: {eventId}</h1>;
    </div>
  );
};
