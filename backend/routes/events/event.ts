//Todo error handling
import express from "express";
const router = express.Router();

import Event from "../../models/event";
import { IEvent } from "../../../types";

//get an event
router.get("/:id", (req, res) => {
  const { event } = req.body;
});

//create new event
router.post("/", async (req, res) => {
  const event: IEvent = req.body;

  try {
    const { _id } = await Event.create(event);

    res.status(201).json({ eventId: _id.toString() });
  } catch (err) {
    res.status(400).json({ errorMessage: "" });
  }
});

//edit event info and setup
router.patch("/:id", (req, res) => {
  res.send("edit event");
});

//delete event
router.delete("/:id", (req, res) => {
  res.send("delete event");
});

function isString(data: any): data is string {
  return typeof data === "string";
}

const hello: any = "10";
const check = isString(hello);
if (check) {
  const hello2 = hello as string;
  console.log(hello2.slice);
}

export default router;
