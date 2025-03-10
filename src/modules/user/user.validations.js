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
    .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .messages({
      "string.pattern.base": "birthDate pattern is wrong",
    }),
  isActive: Joi.boolean().optional().messages({
    "boolean.base": "isActive format must be boolean",
  }),
}).unknown(true);
module.exports = { editProfileValidation };
