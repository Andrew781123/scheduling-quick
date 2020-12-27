import {
  CommonAvailableCategory,
  getEventResponse,
  participant,
  TimeAvailable
} from "../../../../types";

type actions =
  | { type: "FETCH_EVENT"; event: getEventResponse }
  | {
      type: "UPDATE_COMMON_AVAILABLE";
      newCommon: TimeAvailable;
      commonAvailableCategory: CommonAvailableCategory;
      participants: participant[];
    };

const eventReducer = (state: { event: getEventResponse }, action: actions) => {
  switch (action.type) {
    case "FETCH_EVENT": {
      return {
        ...state,
        event: action.event
      };
    }

    case "UPDATE_COMMON_AVAILABLE": {
      return {
        ...state,
        event: {
          ...state.event,
          commonAvailable: action.newCommon,
          commonAvailableCategory: action.commonAvailableCategory,
          participants: action.participants
        }
      };
    }

    default:
      return state;
  }
};

export default eventReducer;
