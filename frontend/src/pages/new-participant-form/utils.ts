import { participant, TimeSlot } from "../../../../types";
import { TIME_STRING, DATE_STRING } from "../../shared/constants";
import { DateAndTimeInput } from "./types";

export const formatData = (
  participantName: string,
  timeSlots: DateAndTimeInput[]
) => {
  // let formattedData: {} = {};
  // const formattedTimeAvilable: Map<string, TimeSlot> = new Map();
  // timeSlots.forEach(timeSlot => {
  //   const { date, fromTime, toTime } = timeSlot;
  //   const dateString: string = date!.format(DATE_STRING);
  //   const fromTimeString: string = fromTime!.format(TIME_STRING);
  //   const toTimeString: string = toTime!.format(TIME_STRING);
  //   const formattedTimeSlot: TimeSlot = [
  //     fromTimeString,
  //     toTimeString,
  //     [participantName]
  //   ];
  //   formattedTimeAvilable.set(dateString, formattedTimeSlot);
  // });
  // (formattedData as participant).name = "Andrew";
  // (formattedData as participant).timeAvailable = formattedTimeAvilable;
  // return formattedData;
};
