import {
  expectedOutput,
  timeNums,
  timeStrings,
  unSimplifiedNotSortedTimeSlots,
  sortedNotSimplifiedTimeSlots
} from "./testData";
import { simplifyTimeSlots, convertToTimeString } from "./utils";

test("simplify timeSlots", () => {
  const simplifiedTimeSlots = simplifyTimeSlots(sortedNotSimplifiedTimeSlots);

  console.log(simplifiedTimeSlots);
  expect(simplifiedTimeSlots).toEqual({ ...expectedOutput.timeAvailable });
});

test("Convert time number to string", () => {
  const convertedTimeStrings: string[] = [];

  for (const timeNum of timeNums) {
    convertedTimeStrings.push(convertToTimeString(timeNum));
  }

  expect(convertedTimeStrings).toEqual(timeStrings);
});
