import { participant, TimeAvailable, TimeSlot } from "../../../../types";
import { TIME_STRING, DATE_STRING } from "../../shared/constants";
import { DateAndTimeInput } from "./types";

export const formatData = (
  participantName: string,
  dateAndTimeInputs: DateAndTimeInput[]
) => {
  let formattedData: {} = {};
  const formattedTimeAvilable: TimeAvailable = {};

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

    formattedTimeAvilable[dateString] = formattedTimeSlots;
  });

  (formattedData as participant).name = participantName;
  (formattedData as participant).timeAvailable = formattedTimeAvilable;

  return formattedData as participant;
};

export const simplifyTimeSlots = (input: participant) => {
  const { timeAvailable } = input;

  Object.keys(timeAvailable).forEach(date => {
    const timeSlots = timeAvailable[date];
    //sort
    for (let i = 1; i < timeSlots.length; i++) {
      const currentTimeSlot = timeSlots[i];
      let j = i - 1;
      for (j; j >= 0; j--) {
        if (+timeSlots[j][0] > +currentTimeSlot[0]) {
          timeSlots[j + 1] = timeSlots[j];
        } else {
          break;
        }
      }
      timeSlots[j + 1] = currentTimeSlot;
    }

    //simplify
    //   simplifiedInput[date] = [];

    //   const timeSlots = input[date];
    //   let comparatorPointer = 0, currentPointer = 0, potentialNewEnd = timeSlots[0][1];

    //   while(comparatorPointer < timeSlots.length) {
    //     const currentStart = timeSlots[currentPointer][0],
    //     currentEnd = timeSlots[currentPointer][1],
    //     nextStart = comparatorPointer < timeSlots.length - 1  ? timeSlots[comparatorPointer + 1][0] : null,
    //     nextEnd = comparatorPointer < timeSlots.length - 1 ? timeSlots[comparatorPointer + 1][1] : null;

    //     // console.log({currentStart}, {currentEnd}, {nextStart}, {nextEnd});

    //     if(nextStart && currentEnd >= nextStart) {
    //       //Must has a nextStart. i.e. comparatorPointer is not pointing to last element
    //       //Can be simplified, so continue and see if next slot can also be simplified
    //       potentialNewEnd = Math.max(potentialNewEnd , nextEnd);
    //       comparatorPointer ++;
    //     } else {
    //       //Can't be simplified
    //       if(comparatorPointer !== currentPointer) {
    //         // console.log(date, {currentEnd}, {comparatorEnd});
    //         const newTimeSlot = [currentStart, potentialNewEnd];
    //         simplifiedInput[date].push(newTimeSlot);
    //       } else {
    //         const newTimeSlot = [currentStart, currentEnd];
    //         simplifiedInput[date].push(newTimeSlot);
    //       }
    //       //update time-slot to compare
    //       comparatorPointer ++;
    //       currentPointer = comparatorPointer;
    //     }
    //   }
    // });

    // return simplifiedInput;
  });
};
