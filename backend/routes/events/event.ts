//Todo error handling
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import Event from "../../models/event";
import { getEventResponse, IEvent } from "../../../types";
import { validate } from "express-validation";
import { createEventValidation, dateValidationMiddeware } from "./validation";
import { asyncWraper, CustomError } from "../utils";

//get an event
router.get(
  "/:id",
  asyncWraper(async (req: Request, res: Response) => {
    // to do, type the query strings
    const { type } = req.query;
    const { id: eventId } = req.params;

    if (type === "form") {
      const event = await Event.findById(eventId).select(
        "info venue periods participants commonDate"
      );

      if (!event) {
        throw new CustomError(
          "CONTENT NOT FOUND",
          "Event requested doesn't exist",
          404
        );
      }

      const eventObject: getEventResponse = event.toObject();
      res.status(200).json({ event: eventObject });
    }
  })
);

//create new event
router.post(
  "/",
  validate(createEventValidation),
  asyncWraper(async (req: Request, res: Response) => {
    const event: IEvent = req.body;

    const { _id } = await Event.create(event);

    res.status(201).json({ eventId: _id.toString() });
  })
);

//edit event info and setup
router.patch("/:id", (req, res) => {
  res.send("edit event");
});

//delete event
router.delete("/:id", (req, res) => {
  res.send("delete event");
});

router.use(dateValidationMiddeware);

export default router;
