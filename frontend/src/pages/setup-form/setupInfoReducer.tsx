import { dateRange, timeRange } from "../../shared/types";
import moment, { Moment } from "moment";
import { setupInfo } from "./types";

type setupInfoActions =
  | { type: "FROM_DATE_SELECT"; dateField: string; date: Moment; index: number }
  | { type: "ADD_DATE_AND_TIME_COMPONENT" }
  | { type: "UPDATE_TIME_RANGE"; timeRange: timeRange; index: number };

const setupInfoReducer = (state: setupInfo, action: setupInfoActions) => {
  switch (action.type) {
    case "FROM_DATE_SELECT": {
      return {
        ...state,
        periods: state.periods.map((period, index) => {
          if (index !== action.index) return period;

          return {
            ...period,
            dateRange: {
              ...period.dateRange,
              [action.dateField]: action.date
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
          timeRange: ["0000", "0000"]
        })
      };
    }

    case "UPDATE_TIME_RANGE": {
      return {
        ...state,
        periods: state.periods.map((period, index) => {
          if (index !== action.index) return period;

          let newPeriod = period;
          newPeriod.timeRange = action.timeRange;
          return newPeriod;
        })
      };
    }

    default:
      return state;
  }
};

export default setupInfoReducer;
