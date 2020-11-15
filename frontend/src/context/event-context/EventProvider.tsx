import React, { createContext, useReducer } from "react";
import { getEventResponse } from "../../../../types";
import eventReducer from "./eventReducer";

interface EventProviderProps {}

const initialEventState: getEventResponse = {
  info: {
    organizer: "",
    venue: {
      name: ""
    }
  },

  periods: [],

  participants: [],

  commonDate: null
};

const EventContext = createContext(initialEventState);

const EventProvider: React.FC<EventProviderProps> = props => {
  const [eventState, dispatch] = useReducer(eventReducer, initialEventState);

  return (
    <EventContext.Provider value={eventState}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventProvider;
