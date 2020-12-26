import React, { createContext, useReducer } from "react";
import {
  CommonByPeopleElement,
  getEventResponse,
  participant,
  TimeAvailable
} from "../../../../types";
import eventReducer from "./eventReducer";
import axios from "../../api/proxy";

interface EventProviderProps {}

interface providerProps {
  event: getEventResponse;
  fetchEvent: (eventId: string) => void;
  updateEventAfterUserSubmit: (
    newCommon: TimeAvailable,
    commonByPeople: CommonByPeopleElement[],
    participants: participant[]
  ) => void;
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

    duration: {
      durationHour: 0,
      durationMin: 0
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

  const updateEventAfterUserSubmit = (
    newCommon: TimeAvailable,
    commonByPeople: CommonByPeopleElement[],
    participants: participant[]
  ) => {
    dispatch({
      type: "UPDATE_COMMON_AVAILABLE",
      newCommon,
      commonByPeople,
      participants
    });
  };

  return (
    <EventContext.Provider
      value={{
        event: eventState.event,
        fetchEvent,
        updateEventAfterUserSubmit
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventProvider;
