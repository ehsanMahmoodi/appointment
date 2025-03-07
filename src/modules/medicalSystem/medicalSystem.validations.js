const Joi = require("joi");
const createMedicalValidation = Joi.object({
  title: Joi.string().required().min(3).messages({
    "any.required": "title is required",
    "string.base": "title format must be string",
    "string.min": "the minimum length of title must be 3 characters ",
  }),
  description: Joi.string().required().min(3).messages({
    "any.required": "description is required",
    "string.base": "description format must be string",
    "string.min": "the minimum length of description must be 3 characters ",
  }),
  parentId: Joi.number().optional().min(1).messages({
    "any.required": "phone is required",
    "number.base": "phone format must be string",
    "number.min": "the minimum of parentId must be 1 ",
  }),
}).unknown(true);
module.exports = { createMedicalValidation };
