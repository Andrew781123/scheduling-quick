import e from "express";
import express from "express";
import { IEvent, participant } from "../../../types";
const router = express.Router();

import Event from "../../models/event";
import { computeNewCommonAvailable } from "../utils";

//new participant
router.post("/:eventId/participants", async (req, res) => {
  console.log(req.body)
  const {eventId} = req.params;
  console.log({eventId})
  const newParticipantInput: participant = req.body;
  const {timeAvailable} = newParticipantInput;

  const event = await Event.findById(eventId);

  if(event) {
    const eventObj: IEvent = event.toObject();
    const {commonAvailable} = eventObj;
    
    if(commonAvailable) {
      const newCommonAvailable = computeNewCommonAvailable(timeAvailable, commonAvailable);
      event.commonAvailable = newCommonAvailable;
    } else {
      event.commonAvailable = timeAvailable;
    }
    event.participants.push(newParticipantInput);
    await event.save();
  } else {
    console.log('no event')
    return res.send('no event')
  }

  res.send("new participant");
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
