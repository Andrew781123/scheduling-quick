//Todo error handling
import express from "express";
const router = express.Router();

import Event, { IEvent } from "../models/event";

//get an event
router.get("/:id", (req, res) => {
  const { event } = req.body;
});

//create new event
router.post("/", async (req, res) => {
  const event: IEvent = req.body;

  try {
    await Event.create(event);

    res.status(201).json({ message: "Event created" });
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

export default router;
