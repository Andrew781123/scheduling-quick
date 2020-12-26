import {
  expectedOutput,
  timeNums,
  timeStrings,
  sortedNotSimplifiedTimeSlots,
  unSimplifiedNotSortedTimeSlots,
  unSimplifiedTimSlots,
  simplifiedTimSlots,
} from "./testData";
import { simplifyTimeSlots, convertToTimeString } from "../utils";

// test('simplify bug', () => {
//   const simplifiedTimeSlotsTest = simplifyTimeSlots(unSimplifiedTimSlots);
//   expect(simplifiedTimeSlotsTest).toMatchObject(simplifiedTimSlots.timeAvailable);
// });

test("simplify timeSlots", () => {
  const simplifiedTimeSlots = simplifyTimeSlots(sortedNotSimplifiedTimeSlots);

  expect(simplifiedTimeSlots).toEqual({ ...expectedOutput.timeAvailable });
});

test("Convert time number to string", () => {
  const convertedTimeStrings: string[] = [];

  for (const timeNum of timeNums) {
    convertedTimeStrings.push(convertToTimeString(timeNum));
  }

  expect(convertedTimeStrings).toEqual(timeStrings);
});
