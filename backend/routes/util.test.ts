import { TimeAvailable } from "../../types";
import {
  computeNewCommonAvailable,
  generateInitialCommonByPeople
} from "./utils";
import {
  currentCommon,
  expectedIntegrationOutput,
  newParticipantInput
} from "./utilTestData";

//integration
describe("update new common and commonByPeople", () => {
  const getTimeSlotCount = (timeAvailable: TimeAvailable) => {
    let timeSlotCount = 0;

    Object.keys(timeAvailable).forEach(date => {
      timeSlotCount += timeAvailable[date].length;
    });

    return timeSlotCount;
  };

  const { newCommon, newCommonByPeople } = computeNewCommonAvailable(
    newParticipantInput,
    currentCommon
  );

  test("update new common", () => {
    expect(newCommon).toMatchObject(expectedIntegrationOutput);
  });

  describe("update commonByPeople", () => {
    test("generate initial commonByPeople", () => {
      const commonByPeople = generateInitialCommonByPeople(newParticipantInput);

      const timeSlotCount = getTimeSlotCount(newParticipantInput);

      expect(commonByPeople.length).toEqual(timeSlotCount);
    });

    test("ensure total number of time-slots is correct", () => {
      const timeSlotCount = getTimeSlotCount(newCommon);

      expect(timeSlotCount).toEqual(newCommonByPeople.length);
    });

    test("test for correct sequence", () => {
      for (let i = 0; i < newCommonByPeople.length - 1; i++) {
        const date = newCommonByPeople[i][0];
        const nextDate = newCommonByPeople[i][0];
        const index = newCommonByPeople[i][1];
        const nextIndex = newCommonByPeople[i][1];

        const peopleCount = newCommon[date][index].length;
        const nextPeopleCount = newCommon[nextDate][nextIndex].length;

        expect(peopleCount).toBeGreaterThanOrEqual(nextPeopleCount);
      }
    });
  });
});
