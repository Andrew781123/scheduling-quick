import {
  DateRangeState,
  NewParticipantDateAndTimeInput,
  timeSlot
} from "./types";
import update from "immutability-helper";
import moment, { Moment } from "moment";
import { initialDateAndTimeInputs, initialTimeSlot } from "./NewParcipantForm";

type Actions =
  | { type: "INITIALIZE_MIN_DATE"; minDate: Moment }
  | {
      type: "SELECT_DATE";
      date: Moment;
      index: number;
      dateRangeField: keyof DateRangeState;
    }
  | {
      type: "ENABLE_RANGE";
      dateIndex: number;
      newToDate: Moment;
    }
  | {
      type: "DISABLE_RANGE";
      dateIndex: number;
    }
  | {
      type: "SELECT_TIME";
      timeField: keyof timeSlot;
      time: Moment | null;
      dateIndex: number;
      timeIndex: number;
    }
  | {
      type: "ADD_DATE_AND_TIME_INPUT";
      minDate: Moment;
    }
  | {
      type: "DELETE_DATE_AND_TIME_INPUT";
      dateIndex: number;
    }
  | {
      type: "ADD_TIME_SLOT";
      dateIndex: number;
    }
  | {
      type: "DELETE_TIME_SLOT";
      dateIndex: number;
      timeSlotIndex: number;
    };

export const NewParticipantFormReducer = (
  state: NewParticipantDateAndTimeInput,
  action: Actions
) => {
  switch (action.type) {
    case "INITIALIZE_MIN_DATE": {
      console.log("updating");
      return update(state, {
        0: {
          dateRange: { fromDate: { $set: action.minDate } }
        }
      });
    }

    case "SELECT_DATE": {
      return update(state, {
        [action.index]: {
          dateRange: { [action.dateRangeField]: { $set: action.date } }
        }
      });
    }

    case "ENABLE_RANGE": {
      return update(state, {
        [action.dateIndex]: {
          dateRange: {
            isRange: { $set: true },
            toDate: { $set: action.newToDate }
          }
        }
      });
    }

    case "DISABLE_RANGE": {
      return update(state, {
        [action.dateIndex]: {
          dateRange: { isRange: { $set: false } }
        }
      });
    }

    case "SELECT_TIME": {
      return update(state, {
        [action.dateIndex]: {
          timeSlots: {
            [action.timeIndex]: {
              [action.timeField]: { $set: action.time }
            }
          }
        }
      });
    }

    case "ADD_DATE_AND_TIME_INPUT": {
      const newDateAndTimeInput = [
        {
          ...initialDateAndTimeInputs[0],
          dateRange: {
            fromDate: action.minDate,
            toDate: moment(),
            isRange: false
          }
        }
      ];

      return update(state, { $push: newDateAndTimeInput });
    }

    case "DELETE_DATE_AND_TIME_INPUT": {
      return update(state, { $splice: [[action.dateIndex, 1]] });
    }

    case "ADD_TIME_SLOT": {
      return update(state, {
        [action.dateIndex]: {
          timeSlots: { $push: [initialTimeSlot] }
        }
      });
    }

    case "DELETE_TIME_SLOT": {
      return update(state, {
        [action.dateIndex]: {
          timeSlots: {
            $splice: [[action.timeSlotIndex, 1]]
          }
        }
      });
    }

    default:
      return state;
  }
};
