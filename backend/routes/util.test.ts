import { computeNewCommonAvailable } from "./utils";
import {
  currentCommon,
  expectedIntegrationOutput,
  newParticipantInput,
} from "./utilTestData";

//integration
test("process new participant input to update common", () => {
  const newCommon = computeNewCommonAvailable(
    newParticipantInput,
    currentCommon
  );

  expect(newCommon).toMatchObject(expectedIntegrationOutput);
});
