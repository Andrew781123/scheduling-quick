import { NextFunction, Request, Response } from "express";
import { Joi, ValidationError } from "express-validation";
import { timeSlot } from "../shared-validation-types";
import { CustomError } from "../utils";

const date = Joi.string().length(10);
const time = Joi.string().length(4);

const dateRange = Joi.array().items(date).length(2);
const timeRange = Joi.array().items(time).length(2);

const dateTimeMap = Joi.object().pattern(date, timeSlot);

export const createEventValidation = {
  body: Joi.object({
    info: Joi.object({
      organizer: Joi.string().required(),
      venue: Joi.object({
        name: Joi.string(),
        googleMapLink: Joi.string().uri()
      })
    }),

    periods: Joi.array()
      .items(
        Joi.object({
          dateRange: dateRange,
          timeRange: timeRange
        })
      )
      .min(1),

    duration: Joi.object({
      durationHour: Joi.number().integer().min(0).max(23),
      durationMin: Joi.number().integer().min(0).max(45)
    }),

    participants: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        timeAvailable: dateTimeMap
      })
    ),

    commonAvailable: dateTimeMap.allow(null),

    linkPassword: Joi.string(),

    authPassword: Joi.string()
  })
};

export const dateValidationMiddeware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  } else if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      name: err.name,
      status: err.statusCode,
      message: err.message
    });
  } else if (err.statusCode === 500) {
    return res.status(500).json({
      status: 500,
      message: err.message
    });
  } else {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    });
  }
};
