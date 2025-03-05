const Joi = require("joi");
const createAvailableTime = Joi.object({
  doctorId: Joi.number().required().messages({
    "number.base": "doctorId format must be number",
    "any.required": "doctorId is required",
  }),
  day: Joi.string()
    .required()
    .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .messages({
      "string.pattern.base": "day pattern is wrong",
    }),
  patientCapacity: Joi.number().min(1).optional().messages({
    "number.base": "patientCapacity format must be number",
    "number.min": "minimum of patientCapacity must be 1",
  }),
  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive format must be boolean",
    "any.required": "isActive is required",
  }),
}).unknown(true);
const editAvailableTime = Joi.object({
  doctorId: Joi.number().required().messages({
    "number.base": "doctorId format must be number",
    "any.required": "doctorId is required",
  }),
  day: Joi.string()
    .required()
    .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .messages({
      "string.pattern.base": "day pattern is wrong",
    }),
  patientCapacity: Joi.number().min(1).optional().messages({
    "number.base": "patientCapacity format must be number",
    "number.min": "minimum of patientCapacity must be 1",
  }),
  isActive: Joi.boolean().optional().messages({
    "boolean.base": "isActive format must be boolean",
  }),
}).unknown(true);
module.exports = { createAvailableTime, editAvailableTime };
