import { dateRange, timeRange } from "../../shared/types";
import moment, { Moment } from "moment";
import {
  dateRangeState,
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
  | { type: "ADD_DATE_AND_TIME_COMPONENT" }
  | { type: "TIME_SELECT"; timeField: string; time: Moment; index: number };

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
            fromDate: null,
            toDate: null
          },
          timeRange: {
            fromTime: null,
            toTime: null
          }
        })
      };
    }

    default:
      return state;
  }
};

export default setupInfoReducer;
