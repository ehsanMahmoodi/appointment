const Joi = require("joi");
const createTimeSlotValidation = Joi.object({
  dayId: Joi.number().required().messages({
    "number.base": "dayId format must be number",
    "any.required": "dayId is required",
  }),
  start: Joi.string()
    .required()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .messages({
      "string.pattern.base": "start time pattern is wrong",
      "any.required": "start time is required",
    }),
  end: Joi.string()
    .optional()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .messages({
      "string.pattern.base": "end time pattern is wrong",
    }),
}).unknown(true);
const editTimeSlotValidation = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "time-slot id format must be number",
    "any.required": "time-slot id is required",
  }),
  start: Joi.string()
    .optional()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .messages({
      "string.pattern.base": "start time pattern is wrong",
    }),
  end: Joi.string()
    .optional()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .messages({
      "string.pattern.base": "end time pattern is wrong",
    }),
}).unknown(true);
module.exports = { createTimeSlotValidation,editTimeSlotValidation };
