import { getEventResponse } from "../../../../types";

type actions = { type: "" };

const eventReducer = (state: getEventResponse, action: actions) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default eventReducer;
