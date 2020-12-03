import { participant, TimeSlot } from "../../../../types";
import { TIME_STRING, DATE_STRING } from "../../shared/constants";
import { DateAndTimeInput } from "./types";

export const formatData = (
  participantName: string,
  dateAndTimeInputs: DateAndTimeInput[]
) => {
  let formattedData: {} = {};
  const formattedTimeAvilable: Map<string, TimeSlot[]> = new Map();
  dateAndTimeInputs.forEach(dateAndTimeInput => {
    const { date, timeSlots } = dateAndTimeInput;
    const dateString: string = date!.format(DATE_STRING);

    const formattedTimeSlots = timeSlots.map(timeSlot => {
      const { fromTime, toTime } = timeSlot;

      const fromTimeString: string = fromTime!.format(TIME_STRING);
      const toTimeString: string = toTime!.format(TIME_STRING);

      const formattedTimeSlot: TimeSlot = [
        fromTimeString,
        toTimeString,
        [participantName]
      ];

      return formattedTimeSlot;
    });
    formattedTimeAvilable.set(dateString, formattedTimeSlots);
  });
  (formattedData as participant).name = "Andrew";
  (formattedData as participant).timeAvailable = formattedTimeAvilable;
  return formattedData;
};
