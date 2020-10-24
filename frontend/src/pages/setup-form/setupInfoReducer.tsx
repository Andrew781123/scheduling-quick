import { IsetupInfo } from "./SetupForm";

type setupInfoActions = { type: "SELECT_DATE"; date: string };

const setupInfoReducer = (state: IsetupInfo, action: setupInfoActions) => {
  switch (action.type) {
    case "SELECT_DATE": {
      return {
        ...state,
        period: state.period.set(action.date, ["", ""])
      };
    }

    default:
      return state;
  }
};

export default setupInfoReducer;
