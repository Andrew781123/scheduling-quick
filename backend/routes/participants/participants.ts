import express from "express";
import {
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
  generateInitialCommonByPeople
} from "../utils";

//new participant
router.post("/:eventId/participants", async (req, res) => {
  const { eventId } = req.params;

  const newParticipantInput: participant = req.body;
  const { timeAvailable } = newParticipantInput;

  const event = await Event.findById(eventId);

  if (event) {
    const eventObj: IEvent = event.toObject();
    const { commonAvailable } = eventObj;

    let newCommonAvailable: unknown;
    let commonByPeople: unknown;

    if (commonAvailable) {
      const { newCommon, newCommonByPeople } = computeNewCommonAvailable(
        timeAvailable,
        commonAvailable
      );

      (newCommonAvailable as TimeAvailable) = newCommon;
      (commonByPeople as CommonByPeopleElement[]) = newCommonByPeople;
    } else {
      newCommonAvailable = timeAvailable;
      (commonByPeople as CommonByPeopleElement[]) = generateInitialCommonByPeople(
        timeAvailable
      );
    }

    event.commonAvailable = newCommonAvailable as TimeAvailable;

    event.commonByPeople = commonByPeople as CommonByPeopleElement[];

    event.participants.push(newParticipantInput);
    await event.save();

    res.status(201).json({ newCommonAvailable, commonByPeople });
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
