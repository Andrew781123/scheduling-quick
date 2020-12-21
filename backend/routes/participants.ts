import express from "express";
const router = express.Router();

import Event from "../models/event";

//new participant
router.post("/", (req, res) => {
  console.log(req.body);
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
