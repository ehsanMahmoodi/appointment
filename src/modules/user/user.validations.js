const Joi = require("joi");
const editProfileValidation = Joi.object({
  profileId: Joi.number().required().messages({
    "number.base": "profileId format must be number",
    "any.required": "profileId is required",
  }),
  firstName: Joi.string().min(3).optional().messages({
    "any.required": "firstName is required",
    "string.base": "firstName format must be string",
    "string.min": "the minimum length of firstName must be 3 characters ",
  }),
  lastName: Joi.string().min(3).optional().messages({
    "any.required": "lastname is required",
    "string.base": "lastname format must be string",
    "string.min": "the minimum length of lastname must be 3 characters ",
  }),
  birthDate: Joi.string()
    .optional()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": "birthDate pattern is wrong",
    }),
  isActive: Joi.boolean().optional().messages({
    "boolean.base": "isActive format must be boolean",
  }),
}).unknown(true);
module.exports = { editProfileValidation };
