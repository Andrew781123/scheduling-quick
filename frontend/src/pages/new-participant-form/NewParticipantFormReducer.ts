import { NewParticipantDateAndTimeInput, timeSlot } from "./types";
import update from "immutability-helper";
import { Moment } from "moment";
import { initialDateAndTimeInputs, initialTimeSlot } from "./NewParcipantForm";

type Actions =
  | { type: "INITIALIZE_MIN_DATE"; minDate: Moment }
  | { type: "SELECT_DATE"; date: Moment; index: number }
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
          date: { $set: action.minDate }
        }
      });
    }

    case "SELECT_DATE": {
      return update(state, {
        [action.index]: {
          date: { $set: action.date }
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
          date: action.minDate
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