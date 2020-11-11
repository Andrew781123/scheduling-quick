import { Joi } from "express-validation";
import { timeSlot } from "../shared-validation-types";

const dateTimeMap = Joi.object().pattern(Joi.string(), timeSlot);

const eventValidation = {
  info: Joi.object({
    organizer: Joi.string().required(),
    venue: Joi.object({
      name: Joi.string(),
      googleMapLink: Joi.string()
    })
  }),

  periods: Joi.array()
    .items(
      Joi.object({
        dateRange: Joi.array()
          .items(
            Joi.string().pattern(
              /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([12]\d{3})$/
            )
          )
          .length(2),
        timeRange: Joi.array().items(Joi.number()).length(2)
      })
    )
    .min(1),

  participants: Joi.object({
    name: Joi.string(),
    timeAvailable: dateTimeMap
  }),

  commonDate: dateTimeMap,

  linkPassword: Joi.string(),

  authPassword: Joi.string()
};

export default eventValidation;
