import { getEventResponse, IEvent } from "../../../../types";

type actions = { type: "FETCH_EVENT"; event: IEvent };

const eventReducer = (state: { event: getEventResponse }, action: actions) => {
  switch (action.type) {
    case "FETCH_EVENT": {
      return {
        ...state,
        event: action.event
      };
    }

    default:
      return state;
  }
};

export default eventReducer;
