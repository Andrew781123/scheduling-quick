import express from "express";
const router = express.Router();

import Event from "../models/event";

//get an event
router.get("/:id", (req, res) => {
  res.send("get an event");
});

//create new event
router.post("/", (req, res) => {
  res.send("new event");
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
