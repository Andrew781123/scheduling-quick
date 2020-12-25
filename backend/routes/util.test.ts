import { computeNewCommonAvailable } from "./utils";
import {
  currentCommon,
  expectedIntegrationOutput,
  newParticipantInput
} from "./utilTestData";

//integration
describe("update new common and sort by number of people", () => {
  const { newCommon, commonByPeople } = computeNewCommonAvailable(
    newParticipantInput,
    currentCommon
  );

  test("update new common", () => {
    expect(newCommon).toMatchObject(expectedIntegrationOutput);
  });

  describe("sort by number of people available", () => {
    test("ensure total number of time-slots is correct", () => {
      let totalTimeSlots = 0;

      Object.keys(newCommon).forEach(date => {
        totalTimeSlots += newCommon[date].length;
      });

      expect(totalTimeSlots).toEqual(commonByPeople.length);
    });

    test("test for correct sequence", () => {
      for (let i = 0; i < commonByPeople.length - 1; i++) {
        const date = commonByPeople[i][0];
        const nextDate = commonByPeople[i][0];
        const index = commonByPeople[i][1];
        const nextIndex = commonByPeople[i][1];

        const peopleCount = newCommon[date][index].length;
        const nextPeopleCount = newCommon[nextDate][nextIndex].length;

        expect(peopleCount).toBeGreaterThanOrEqual(nextPeopleCount);
      }
    });
  });
});
