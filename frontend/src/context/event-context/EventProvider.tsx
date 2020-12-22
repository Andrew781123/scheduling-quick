import React, { createContext, useReducer } from "react";
import { getEventResponse, queryString } from "../../../../types";
import eventReducer from "./eventReducer";
import axios from "../../api/proxy";

interface EventProviderProps {}

interface providerProps {
  event: getEventResponse;
  fetchEvent: (eventId: string) => void;
}

const initialEventState: Pick<providerProps, "event"> = {
  event: {
    info: {
      organizer: "",
      venue: {
        name: ""
      }
    },

    periods: [],

    participants: [],

    commonAvailable: null
  }
};

export const EventContext = createContext<providerProps>(undefined!);

const EventProvider: React.FC<EventProviderProps> = props => {
  const [eventState, dispatch] = useReducer(eventReducer, initialEventState);

  const fetchEvent = async (eventId: string) => {
    const queryString: queryString = {
      key: "type",
      value: "form"
    };

    const res = await axios.get(
      `/events/${eventId}?${queryString.key}=${queryString.value}`
    );

    dispatch({ type: "FETCH_EVENT", event: res.data.event });
  };

  return (
    <EventContext.Provider
      value={{
        event: eventState.event,
        fetchEvent
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventProvider;
