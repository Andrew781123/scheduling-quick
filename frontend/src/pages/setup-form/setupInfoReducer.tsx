import { IsetupInfo } from "./SetupForm";
import { dateRange } from "../../shared/types";

type setupInfoActions =
  | { type: "SELECT_DATE"; dateRange: dateRange; index: number }
  | { type: "ADD_DATE_AND_TIME_COMPONENT" };

const setupInfoReducer = (state: IsetupInfo, action: setupInfoActions) => {
  switch (action.type) {
    case "SELECT_DATE": {
      return {
        ...state,
        period: state.periods.map((period, index) => {
          if (index !== action.index) return period;

          return action.dateRange;
        })
      };
    }

    case "ADD_DATE_AND_TIME_COMPONENT": {
      return {
        ...state,
        periodCount: state.periodCount + 1
      };
    }

    default:
      return state;
  }
};

export default setupInfoReducer;
