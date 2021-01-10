import moment, { Moment } from "moment";
import {
  dateRangeState,
  EventDuration,
  periodState,
  setupInfo,
  timeRangeState
} from "./types";

type setupInfoActions =
  | {
      type: "FROM_DATE_SELECT";
      periodField: keyof periodState;
      fromToField: keyof dateRangeState | keyof timeRangeState;
      date: Moment;
      index: number;
    }
  | {
      type: "DURATION_SELECT";
      durationField: keyof EventDuration;
      data: number;
    }
  | { type: "ADD_DATE_AND_TIME_COMPONENT" }
  | {
      type: "TEXT_INPUT";
      textField: string;
      text: string;
    }
  | {
      type: "AUTO_SET_TO_TIME";
      toTime: Moment;
    }
  | {
      type: "AUTO_SET_TO_DATE";
      toDate: Moment;
    };
const setupInfoReducer = (state: setupInfo, action: setupInfoActions) => {
  switch (action.type) {
    case "FROM_DATE_SELECT": {
      return {
        ...state,
        periods: state.periods.map((period, index) => {
          if (index !== action.index) return period;

          return {
            ...period,
            [action.periodField]: {
              ...period[action.periodField],
              [action.fromToField]: action.date
            }
          };
        })
      };
    }

    case "ADD_DATE_AND_TIME_COMPONENT": {
      return {
        ...state,
        periods: state.periods.concat({
          dateRange: {
            fromDate: moment(),
            toDate: moment()
          },
          timeRange: {
            fromTime: moment("0000"),
            toTime: moment("0000")
          }
        })
      };
    }

    case "DURATION_SELECT": {
      return {
        ...state,
        duration: {
          ...state.duration,
          [action.durationField]: action.data
        }
      };
    }

    case "TEXT_INPUT": {
      return {
        ...state,
        [action.textField]: action.text
      };
    }

    //to do: refactor this when implement multi time-slots
    case "AUTO_SET_TO_TIME": {
      return {
        ...state,
        periods: [
          {
            ...state.periods[0],
            timeRange: {
              ...state.periods[0].timeRange,
              toTime: action.toTime
            }
          }
        ]
      };
    }

    case "AUTO_SET_TO_DATE": {
      return {
        ...state,
        periods: [
          {
            ...state.periods[0],
            dateRange: {
              ...state.periods[0].dateRange,
              toDate: action.toDate
            }
          }
        ]
      };
    }

    default:
      return state;
  }
};

export default setupInfoReducer;
