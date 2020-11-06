import express from "express";
const router = express.Router();

import Event, { IEvent } from "../models/event";

//get an event
router.get("/:id", (req, res) => {
  const { event } = req.body;
});

//create new event
router.post("/", (req, res) => {
  // Event.create({
  //   info: {}
  // });
  res.send("create new event");
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
