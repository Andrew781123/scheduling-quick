import { participant } from "../../../../types";
import { simplifyTimeSlots } from "./utils";

const unSimplifiedTimeSlots: participant = {
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

const sortedTimeSlots: participant = {
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

const expectedOutput: participant = {
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

test("simplify input", () => {
  simplifyTimeSlots(unSimplifiedTimeSlots);

  expect(unSimplifiedTimeSlots).toMatchObject(sortedTimeSlots);
});
