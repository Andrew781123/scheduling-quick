import {
  DateRangeState,
  NewParticipantDateAndTimeInput,
  timeSlot
} from "./types";
import update from "immutability-helper";
import { Moment } from "moment";
import { initialDateAndTimeInputs, initialTimeSlot } from "./NewParcipantForm";

type Actions =
  | { type: "INITIALIZE_MIN_DATE"; minDate: Moment }
  | {
      type: "SELECT_DATE";
      date: Moment;
      index: number;
      dateRangeField: keyof DateRangeState<Moment | null>;
    }
  | {
      type: "ENABLE_RANGE";
      dateIndex: number;
      newToDate: Moment;
    }
  | {
      type: "DISABLE_RANGE";
      dateIndex: number;
      fromDate: Moment;
    }
  | {
      type: "SELECT_TIME";
      timeField: keyof timeSlot;
      time: Moment | null;
      dateIndex: number;
      timeIndex: number;
    }
  | {
      type: "AUTO_SET_TO_TIME";
      toTime: Moment;
      dateIndex: number;
      timeIndex: number;
    }
  | {
      type: "AUTO_SET_TO_DATE";
      toDate: Moment;
      dateIndex: number;
    }
  | {
      type: "ADD_DATE_AND_TIME_INPUT";
      fromDate: Moment;
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
    }
  | {
      type: "SET_IS_DATE_VALID";
      dateIndex: number;
      isValid: boolean;
    }
  | {
      type: "SET_IS_TIME_SLOT_VALID";
      dateIndex: number;
      timeSlotIndex: number;
      isValid: boolean;
    };

export const NewParticipantFormReducer = (
  state: NewParticipantDateAndTimeInput,
  action: Actions
) => {
  switch (action.type) {
    case "INITIALIZE_MIN_DATE": {
      return update(state, {
        0: {
          dateRange: {
            fromDate: { $set: action.minDate },
            toDate: { $set: action.minDate }
          }
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
          dateRange: {
            isRange: { $set: false },
            toDate: { $set: action.fromDate }
          }
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

    case "AUTO_SET_TO_TIME": {
      return update(state, {
        [action.dateIndex]: {
          timeSlots: {
            [action.timeIndex]: {
              toTime: { $set: action.toTime }
            }
          }
        }
      });
    }

    case "AUTO_SET_TO_DATE": {
      return update(state, {
        [action.dateIndex]: {
          dateRange: { toDate: { $set: action.toDate } }
        }
      });
    }

    case "ADD_DATE_AND_TIME_INPUT": {
      const newDateAndTimeInput = [
        {
          ...initialDateAndTimeInputs[0],
          dateRange: {
            fromDate: action.fromDate,
            toDate: action.fromDate,
            isValid: true,
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

    case "SET_IS_DATE_VALID": {
      return update(state, {
        [action.dateIndex]: { dateRange: { isValid: { $set: action.isValid } } }
      });
    }

    case "SET_IS_TIME_SLOT_VALID": {
      return update(state, {
        [action.dateIndex]: {
          timeSlots: {
            [action.timeSlotIndex]: {
              isValid: { $set: action.isValid }
            }
          }
        }
      });
    }

    default:
      return state;
  }
};
