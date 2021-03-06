import express from "express";
import {
  CommonAvailableCategory,
  CommonByPeopleElement,
  IEvent,
  participant,
  TimeAvailable
} from "../../../types";
const router = express.Router();

import Event from "../../models/event";
import {
  computeNewCommonAvailable,
  CustomError,
  generateCommonAvailableCategory
} from "../utils";

//new participant
router.post("/:eventId/participants", async (req, res) => {
  const { eventId } = req.params;

  const newParticipantInput: participant = req.body;
  const { timeAvailable } = newParticipantInput;

  const event = await Event.findById(eventId);

  if (event) {
    const eventObj: IEvent = event.toObject();
    const { commonAvailable, duration } = eventObj;

    let newCommonAvailable: unknown;
    let commonAvailableCategory: unknown;

    if (commonAvailable) {
      const newCommon = computeNewCommonAvailable(
        timeAvailable,
        commonAvailable
      );

      (newCommonAvailable as TimeAvailable) = newCommon;
      (commonAvailableCategory as CommonAvailableCategory) = generateCommonAvailableCategory(
        newCommon,
        duration,
        eventObj.participants.length + 1, //include new participant
        false
      );
    } else {
      newCommonAvailable = timeAvailable;
      (commonAvailableCategory as CommonAvailableCategory) = generateCommonAvailableCategory(
        timeAvailable,
        duration,
        eventObj.participants.length + 1,
        true
      );
    }

    event.commonAvailable = newCommonAvailable as TimeAvailable;

    event.commonAvailableCategory = commonAvailableCategory as CommonAvailableCategory;

    event.participants.push(newParticipantInput);
    const { participants } = await event.save();

    res
      .status(201)
      .json({ newCommonAvailable, commonAvailableCategory, participants });
  } else {
    throw new CustomError(
      "CONTENT NOT FOUND",
      "Event requested doesn't exist",
      404
    );
  }
});

//edit participant's input
router.patch("/:id", (req, res) => {
  res.send("edit participant");
});

//remove a date from participant (combine with patch)
router.delete("/:id/date", (req, res) => {});

//remove one participant
router.delete("/:id", (req, res) => {
  res.send("remove one participant");
});

export default router;
