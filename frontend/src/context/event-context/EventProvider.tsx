import React, { createContext, useReducer } from "react";
import {
  CommonAvailableCategory,
  getEventResponse,
  participant,
  TimeAvailable
} from "../../../../types";
import eventReducer from "./eventReducer";
import axios from "../../api/proxy";
import { DATE_STRING } from "../../shared/constants";
import moment from "moment";

interface EventProviderProps {}

interface providerProps {
  event: getEventResponse;
  loadingEvent: boolean;
  fetchEvent: (eventId: string) => void;
  updateEventAfterUserSubmit: (
    newCommon: TimeAvailable,
    commonAvailableCategory: CommonAvailableCategory,
    participants: participant[]
  ) => void;
}

const initialEventState: Pick<providerProps, "event"> & {
  loadingEvent: boolean;
} = {
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

    periods: [
      {
        dateRange: [moment().format(DATE_STRING), moment().format(DATE_STRING)],
        timeRange: ["0000", "0000"]
      }
    ],

    participants: [],

    commonAvailable: null
  },
  loadingEvent: false
};

export const EventContext = createContext<providerProps>(undefined!);

const EventProvider: React.FC<EventProviderProps> = props => {
  const [eventState, dispatch] = useReducer(eventReducer, initialEventState);

  const fetchEvent = async (eventId: string) => {
    dispatch({ type: "SET_EVENT_LOADING" });

    const res = await axios.get(`/events/${eventId}`);

    dispatch({ type: "FETCH_EVENT", event: res.data.event });
  };

  const updateEventAfterUserSubmit = (
    newCommon: TimeAvailable,
    commonAvailableCategory: CommonAvailableCategory,
    participants: participant[]
  ) => {
    dispatch({
      type: "UPDATE_COMMON_AVAILABLE",
      newCommon,
      commonAvailableCategory,
      participants
    });
  };

  return (
    <EventContext.Provider
      value={{
        event: eventState.event,
        loadingEvent: eventState.loadingEvent,
        fetchEvent,
        updateEventAfterUserSubmit
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventProvider;
