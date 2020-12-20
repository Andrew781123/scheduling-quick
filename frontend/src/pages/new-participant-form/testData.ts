import { participant, TimeSlot } from "../../../../types";

export const timeNums = [100, 115, 200, 1500, 2000];

export const timeStrings = ["0100", "0115", "0200", "1500", "2000"];

export const unSimplifiedNotSortedTimeSlots: participant = {
  name: "Andrew",
  timeAvailable: {
    10: [
      ["1000", "1200", ["Andrew"]],
      ["0900", "1500", ["Andrew"]],
      ["1900", "2300", ["Andrew"]]
    ],
    15: [
      ["1800", "2300", ["Andrew"]],
      ["1400", "2000", ["Andrew"]],
      ["0800", "0900", ["Andrew"]]
    ],
    18: [
      ["0600", "1200", ["Andrew"]],
      ["0100", "0400", ["Andrew"]],
      ["2000", "2100", ["Andrew"]]
    ]
  }
};

//sorted but not simplified
export const sortedNotSimplifiedTimeSlots: participant = {
  name: "Andrew",
  timeAvailable: {
    10: [
      ["0900", "1500", ["Andrew"]],
      ["1000", "1200", ["Andrew"]],
      ["1900", "2300", ["Andrew"]]
    ],
    15: [
      ["0800", "0900", ["Andrew"]],
      ["1400", "2000", ["Andrew"]],
      ["1800", "2300", ["Andrew"]]
    ],
    18: [
      ["0100", "0400", ["Andrew"]],
      ["0600", "1200", ["Andrew"]],
      ["2000", "2100", ["Andrew"]]
    ]
  }
};

export const expectedOutput: participant = {
  name: "Andrew",
  timeAvailable: {
    10: [
      ["0900", "1500", ["Andrew"]],
      ["1900", "2300", ["Andrew"]]
    ],
    15: [
      ["0800", "0900", ["Andrew"]],
      ["1400", "2300", ["Andrew"]]
    ],
    18: [
      ["0100", "0400", ["Andrew"]],
      ["0600", "1200", ["Andrew"]],
      ["2000", "2100", ["Andrew"]]
    ]
  }
};
