import {
  participant,
  period,
  TimeAvailable,
  TimeSlot
} from "../../../../types";
import { TIME_STRING, DATE_STRING } from "../../shared/constants";
import {
  DateAndTimeInput,
  DateRangeState,
  NewParticipantDateAndTimeInput,
  SelectedDateMap
} from "./types";
import moment, { Moment } from "moment";
import { validateNameInput } from "../../shared/validation";

export const computeMinMaxDate = (periods: period[]) => {
  let minDate = moment(periods[0].dateRange[0], DATE_STRING);
  let maxDate = moment(periods[0].dateRange[1], DATE_STRING);

  for (let i = 1; i < periods.length; i++) {
    const period = periods[i];

    const { dateRange } = period;

    const fromDateMoment = moment(dateRange[0], DATE_STRING);
    const toDateMoment = moment(dateRange[1], DATE_STRING);

    if (fromDateMoment.diff(minDate, "days") > 0) {
      minDate = fromDateMoment;
    }

    if (toDateMoment.diff(maxDate, "days") > 0) {
      maxDate = toDateMoment;
    }
  }

  return [minDate, maxDate];
};

export const formatData = (
  participantName: string,
  dateAndTimeInputs: DateAndTimeInput[]
) => {
  let formattedData: {} = {};
  const formattedTimeAvilable: TimeAvailable = {};

  //format the timeSlots first
  dateAndTimeInputs.forEach(dateAndTimeInput => {
    const { dateRange, timeSlots } = dateAndTimeInput;

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

    //push the time slots to corresponding dates
    if (dateRange.isRange) {
      const currentDate = dateRange.fromDate;
      let currentDateCopy = currentDate!.clone();

      while (currentDateCopy!.diff(dateRange.toDate) <= 0) {
        const dateString: string = currentDateCopy!.format(DATE_STRING);

        formattedTimeAvilable[dateString] = formattedTimeSlots;

        currentDateCopy!.add(1, "day");
      }
    } else {
      const dateString: string = dateRange.fromDate!.format(DATE_STRING);
      formattedTimeAvilable[dateString] = formattedTimeSlots;
    }
  });

  (formattedData as participant).name = participantName;
  (formattedData as participant).timeAvailable = formattedTimeAvilable;

  return formattedData as participant;
};

export const sortTimeSlots = (participantInput: participant) => {
  const { timeAvailable } = participantInput;

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
  });
};

export const generateRequestData = (
  participantName: string,
  dateAndTimeInputs: DateAndTimeInput[]
) => {
  const formattedPartipantInput = formatData(
    participantName,
    dateAndTimeInputs
  );

  sortTimeSlots(formattedPartipantInput);

  const simplifiedTimeSlots = simplifyTimeSlots(formattedPartipantInput);

  const outputData: participant = {
    name: participantName,
    timeAvailable: simplifiedTimeSlots
  };

  return outputData;
};

export const convertToTimeString = (timeNum: number) => {
  let timeString = timeNum.toString();
  return timeString.length === 3 ? "0" + timeString : timeString;
};

export const simplifyTimeSlots = (participantInput: participant) => {
  const { name, timeAvailable } = participantInput;
  let simplifiedTimeSlots = {};

  Object.keys(timeAvailable).forEach(date => {
    const timeSlots = timeAvailable[date];
    (simplifiedTimeSlots as TimeAvailable)[date] = [];

    let comparatorPointer = 0,
      currentPointer = 0,
      potentialNewEnd = +timeSlots[0][1];

    while (comparatorPointer < timeSlots.length) {
      const currentStart = +timeSlots[currentPointer][0],
        currentEnd = +timeSlots[currentPointer][1],
        nextStart =
          comparatorPointer < timeSlots.length - 1
            ? +timeSlots[comparatorPointer + 1][0]
            : null,
        nextEnd =
          comparatorPointer < timeSlots.length - 1
            ? +timeSlots[comparatorPointer + 1][1]
            : null;

      if (nextStart && currentEnd >= nextStart) {
        //Must has a nextStart. i.e. comparatorPointer is not pointing to last element
        //Can be simplified, so continue and see if next slot can also be simplified
        potentialNewEnd = Math.max(potentialNewEnd, nextEnd!);
        comparatorPointer++;
      } else {
        //Can't be simplified
        if (comparatorPointer !== currentPointer) {
          const newTimeSlot: TimeSlot = [
            convertToTimeString(currentStart),
            convertToTimeString(potentialNewEnd),
            [name]
          ];
          (simplifiedTimeSlots as TimeAvailable)[date].push(newTimeSlot);
        } else {
          const newTimeSlot: TimeSlot = [
            convertToTimeString(currentStart),
            convertToTimeString(currentEnd),
            [name]
          ];
          (simplifiedTimeSlots as TimeAvailable)[date].push(newTimeSlot);
        }
        //update time-slot to compare
        comparatorPointer++;
        currentPointer = comparatorPointer;
        if (nextEnd) potentialNewEnd = nextEnd;
      }
    }
  });

  return simplifiedTimeSlots;
};

export const validateInput = (
  name: string,
  dateAndTimeInputs: NewParticipantDateAndTimeInput
) => {
  let errors: string[] = [];

  const nameError = validateNameInput(name);

  if (nameError) errors.push(nameError);

  let dateRangeArr: DateRangeState<Moment | null>[] = [];
  for (const input of dateAndTimeInputs) {
    const { dateRange } = input;

    dateRangeArr.push(dateRange);
  }

  const dateOverlapError = checkOverLapDates(dateRangeArr);

  if (dateOverlapError) errors.push("There are overlap dates");

  //check any date and time input error
  errors.push(...checkAnyInvalidDateAndTimeInputs(dateAndTimeInputs));

  return errors;
};

export const findSmallestNotSelectedDate = (
  map: SelectedDateMap,
  minDate: Moment,
  maxDate: Moment
) => {
  const minDateClone = minDate.clone();
  let foundDate = minDateClone;

  while (foundDate.diff(maxDate) <= 0) {
    const foundDateString = foundDate.format(DATE_STRING);

    if (!map[foundDateString]) break;

    foundDate.add(1, "day");
  }

  //that means all dates are selected
  if (foundDate.diff(maxDate) > 0) return null;
  else return foundDate;
};

export const convertCoordinatesToKey = (x: number, y: number) => {
  return x.toString() + y.toString();
};

export const checkOverLapDates = (
  dateRangeArr: DateRangeState<Moment | null>[]
) => {
  const selectedDateMap: SelectedDateMap = {};

  for (const dateRange of dateRangeArr) {
    const { fromDate, toDate } = dateRange;

    const fromDateClone = fromDate!.clone();
    //if !isRange, toDate === fromDate
    const toDateClone = toDate!.clone() || fromDateClone;

    const currentDate = fromDateClone;
    while (currentDate.diff(toDateClone, "days") <= 0) {
      const dateString = currentDate.format(DATE_STRING);

      if (selectedDateMap[dateString]) return true;

      selectedDateMap[dateString] = true;

      currentDate.add(1, "day");
    }
  }

  return false;
};

export const checkAnyInvalidDateAndTimeInputs = (
  dateAndTimeInputs: NewParticipantDateAndTimeInput
) => {
  let errors: string[] = [];

  const INVALID_DATE_MESSAGE = "There are invalid date inputs";
  const INVALID_TIME_SLOT_MESSAGE = "There are invalid time inputs";

  dateAndTimeInputs.forEach(input => {
    const { dateRange, timeSlots } = input;

    if (!errors.includes(INVALID_DATE_MESSAGE) && !dateRange.isValid)
      errors.push(INVALID_DATE_MESSAGE);

    if (!errors.includes(INVALID_TIME_SLOT_MESSAGE)) {
      for (const timeSlot of timeSlots) {
        if (!timeSlot.isValid) errors.push(INVALID_TIME_SLOT_MESSAGE);
      }
    }
  });

  return errors;
};

export const checkAnyInvalidTimeSlots = (
  dateAndTimeInputs: NewParticipantDateAndTimeInput
) => {};
