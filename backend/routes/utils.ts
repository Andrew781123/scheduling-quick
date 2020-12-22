import { NextFunction, Request, Response } from "express";
import { TimeSlot, TimeAvailable } from "../../types";

export const asyncWraper = (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => fn(req, res, next).catch(next);

type errorNames = "CONTENT NOT FOUND";
export class CustomError extends Error {
  statusCode: number;

  constructor(name: errorNames, message: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export const computeNewCommonAvailable = (
  input: TimeAvailable,
  currentCommon: TimeAvailable
) => {
  let newCommon = {};

  Object.keys(input).forEach(date => {
    let i = 0,
      j = 0,
      inputHasLargerRange;

    (newCommon as TimeAvailable)[date] = [];

    const inputTimeSlots = input[date];
    const matchedTimeSlots = currentCommon[date];

    if(!matchedTimeSlots) {
      (newCommon as TimeAvailable)[date] = inputTimeSlots;
      return;
    }

    let temp: TimeSlot[] = [];

    while (i < inputTimeSlots.length && j < matchedTimeSlots.length) {
      const inputStart = inputTimeSlots[i][0],
        inputEnd = inputTimeSlots[i][1],
        matchedStart = matchedTimeSlots[j][0],
        matchedEnd = matchedTimeSlots[j][1];

      if (checkInBetween(inputStart, matchedStart, inputEnd, matchedEnd)) {
        //if in between
        if (temp.length == 0) {
          temp.push(inputTimeSlots[i], matchedTimeSlots[j]);

          if (inputEnd > matchedEnd) inputHasLargerRange = true;
          else inputHasLargerRange = false;
        } else {
          //If there are timeSlots in temp
          if (inputHasLargerRange) temp.push(matchedTimeSlots[j]);
          else temp.push(inputTimeSlots[i]);
        }

        if (inputHasLargerRange) j++;
        else i++;
      } else {
        //if not in between
        if (temp.length > 0) {
          //output the content in temp
          (newCommon as TimeAvailable)[date] = [
            ...(newCommon as TimeAvailable)[date],
            ...splitTimeSlots(temp)
          ];

          temp = [];

          if (inputHasLargerRange) i++;
          else j++;

          continue;
        }
        //temp is empty
        if (inputStart < matchedStart) {
          (newCommon as TimeAvailable)[date].push(inputTimeSlots[i]);
          i++;
        } else {
          (newCommon as TimeAvailable)[date].push(matchedTimeSlots[j]);
          j++;
        }
      }
    }

    if (temp.length > 0) {
      //clear temp if exists

      (newCommon as TimeAvailable)[date] = [
        ...(newCommon as TimeAvailable)[date],
        ...splitTimeSlots(temp)
      ];
      if (inputHasLargerRange) i++;
      else j++;
    }

    //push remaining timeSlots
    for (i; i < inputTimeSlots.length; i++) {
      (newCommon as TimeAvailable)[date].push(inputTimeSlots[i]);
    }

    for (j; j < matchedTimeSlots.length; j++) {
      (newCommon as TimeAvailable)[date].push(matchedTimeSlots[j]);
    }
  });

  //add timeslots of incommon date of input and currentCommon
  Object.keys(currentCommon).forEach((date) => {
    if((newCommon as TimeAvailable)[date]) return;
      
    (newCommon as TimeAvailable)[date] = currentCommon[date];
  });

  return newCommon as TimeAvailable;
};

const splitTimeSlots = (timeSlots: TimeSlot[]) => {
  //e.g [20, 22, ['A']], [21, 23, ['B', 'C']]
  //   -> [20, 22, 21, 23]  (flatten)
  //   -> [20, 21, 22, 23]  (sorted)
  //   -> [[20, 21], [21, 22], [22, 23]]
  const flattenedTimeSlots = flattenTimeSlotsToNumbers(timeSlots);

  const sortedNumbers = mergeSort(flattenedTimeSlots);

  const splittedTimeSlots = generateTimeSlots(sortedNumbers);

  //push names of available string, string]people
  for (let i = 0; i < splittedTimeSlots.length; i++) {
    const splittedStart = splittedTimeSlots[i][0];
    const splittedEnd = splittedTimeSlots[i][1];

    for (let j = 0; j < timeSlots.length; j++) {
      const originalStart = timeSlots[j][0];
      const originalEnd = timeSlots[j][1];

      if (
        checkInBetween(splittedStart, originalStart, splittedEnd, originalEnd)
      ) {
        const people = timeSlots[j][2];
        if (splittedTimeSlots[i][2].length !== 0)
          splittedTimeSlots[i][2] = [...splittedTimeSlots[i][2], ...people];
        else splittedTimeSlots[i][2] = people;
      }
    }
  }

  return splittedTimeSlots;
};

function flattenTimeSlotsToNumbers(timeSlots: TimeSlot[]) {
  const flattenedTimeSlots: string[] = [];

  for (let i = 0; i < timeSlots.length; i++) {
    flattenedTimeSlots.push(timeSlots[i][0], timeSlots[i][1]);
  }

  return flattenedTimeSlots;
}

function mergeSort(arr: string[]) {
  function sortTwoSorted(arr1: string[], arr2: string[]) {
    let sortedArr = [];

    let p1 = 0,
      p2 = 0;

    while (p1 < arr1.length && p2 < arr2.length) {
      if (+arr1[p1] < +arr2[p2]) {
        sortedArr.push(arr1[p1]);
        p1++;
      } else {
        sortedArr.push(arr2[p2]);
        p2++;
      }
    }

    for (p1; p1 < arr1.length; p1++) {
      sortedArr.push(arr1[p1]);
    }

    for (p2; p2 < arr2.length; p2++) {
      sortedArr.push(arr2[p2]);
    }

    return sortedArr;
  }

  if (arr.length === 1) return arr;

  const mid = Math.floor(arr.length / 2);

  const left: string[] = mergeSort(arr.slice(0, mid));
  const right: string[] = mergeSort(arr.slice(mid));

  return sortTwoSorted(left, right);
}

function generateTimeSlots(arr: string[]) {
  const newTimeSlots: TimeSlot[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const newStart = arr[i];
    const newEnd = arr[i + 1];

    if (newStart === newEnd) continue;

    newTimeSlots.push([newStart, newEnd, []]);
  }

  return newTimeSlots;
}

const checkInBetween = (
  start1: string,
  start2: string,
  end1: string,
  end2: string
) => {
  return !(
    (+start1 - +end2 <= 0 && +end1 - +start2 <= 0) ||
    (+start1 - +end2 >= 0 && +end1 - +start2 >= 0)
  );
};
