import { IsetupInfo } from "./SetupForm";
import { dateRange, timeRange } from "../../shared/types";
import moment from "moment";

type setupInfoActions =
  | { type: "SELECT_DATE"; dateRange: dateRange; index: number }
  | { type: "ADD_DATE_AND_TIME_COMPONENT" }
  | { type: "UPDATE_TIME_RANGE"; timeRange: timeRange; index: number };

const setupInfoReducer = (state: IsetupInfo, action: setupInfoActions) => {
  switch (action.type) {
    case "SELECT_DATE": {
      return {
        ...state,
        periods: state.periods.map((period, index) => {
          if (index !== action.index) return period;

          let newPeriod = period;
          newPeriod.dateRange = action.dateRange;
          return newPeriod;
        })
      };
    }

    case "ADD_DATE_AND_TIME_COMPONENT": {
      return {
        ...state,
        periods: state.periods.concat({
          dateRange: [
            moment().format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ],
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
