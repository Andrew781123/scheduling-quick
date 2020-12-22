import React, { createContext, useReducer } from "react";
import { getEventResponse, TimeAvailable } from "../../../../types";
import eventReducer from "./eventReducer";
import axios from "../../api/proxy";

interface EventProviderProps {}

interface providerProps {
  event: getEventResponse;
  fetchEvent: (eventId: string) => void;
  updateCommonAvailable: (newCommon: TimeAvailable) => void;
}

const initialEventState: Pick<providerProps, "event"> = {
  event: {
    _id: "",

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
    const res = await axios.get(`/events/${eventId}`);

    dispatch({ type: "FETCH_EVENT", event: res.data.event });
  };

  const updateCommonAvailable = (newCommon: TimeAvailable) => {
    dispatch({ type: "UPDATE_COMMON_AVAILABLE", newCommon });
  };

  return (
    <EventContext.Provider
      value={{
        event: eventState.event,
        fetchEvent,
        updateCommonAvailable
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventProvider;
