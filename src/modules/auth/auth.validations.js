const Joi = require("joi");
const sendOtpValidation = Joi.object({
  phone: Joi.string()
    .length(11)
    .pattern(/^(09\d{9})$/)
    .required()
    .messages({
      "any.required": "phone is required",
      "string.base": "phone format must be string",
      "string.length": "the lenght of phone must be 11 characters ",
      "string.pattern.base": "phoen number is wrong",
    }),
});
const checkOtpValidation = Joi.object({
  phone: Joi.string()
    .length(11)
    .pattern(/^(09\d{9})$/)
    .required()
    .messages({
      "any.required": "phone is required",
      "string.base": "phone format must be string",
      "string.length": "the lenght of phone must be 11 characters ",
      "string.pattern.base": "phoen number is wrong",
    }),
  code: Joi.number().required().messages({
    "any.required": "code is required",
    "number.base": "code format must be number",
  }),
});
module.exports = { sendOtpValidation, checkOtpValidation };
