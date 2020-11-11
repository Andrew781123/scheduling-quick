import { Joi } from "express-validation";

export const timeSlot = Joi.array()
  .items(Joi.string(), Joi.string(), Joi.array().items(Joi.string()))
  .length(3);
