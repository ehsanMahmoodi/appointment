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
      "string.length": "the length of phone must be 11 characters ",
      "string.pattern.base": "phone number is wrong",
    }),
  code: Joi.number().required().messages({
    "any.required": "code is required",
    "number.base": "code format must be number",
  }),
});
const registerDoctorValidation = Joi.object({
  profileId: Joi.number().required().messages({
    "number.base": "profileId format must be number",
    "any.required": "profileId is required",
  }),
  medicalSystemCode: Joi.number().required().messages({
    "any.required": "medicalSystemCode is required",
    "number.base": "medicalSystemCode format must be number",
  }),
  medicalSpecialtyId: Joi.number().messages({
    "number.base": "medicalSpecialtyId format must be number",
  }),
  firstName: Joi.string().required().min(3).messages({
    "any.required": "firstName is required",
    "string.base": "firstName format must be string",
    "string.min": "the minimum length of firstName must be 3 characters ",
  }),
  lastname: Joi.string().required().min(2).messages({
    "any.required": "lastname is required",
    "string.base": "lastname format must be string",
    "string.min": "the minimum length of lastname must be 3 characters ",
  }),
  nationalCode: Joi.string().required().length(10).messages({
    "any.required": "nationalCode is required",
    "string.base": "nationalCode format must be string",
    "string.length": "the length of nationalCode must be 10 characters ",
  }),
}).unknown(true);
const registerPatientValidation = Joi.object({
  profileId: Joi.number().required().messages({
    "number.base": "profileId format must be number",
    "any.required": "profileId is required",
  }),
  firstName: Joi.string().required().min(3).messages({
    "any.required": "firstName is required",
    "string.base": "firstName format must be string",
    "string.min": "the minimum length of firstName must be 3 characters ",
  }),
  lastname: Joi.string().required().min(2).messages({
    "any.required": "lastname is required",
    "string.base": "lastname format must be string",
    "string.min": "the minimum length of lastname must be 3 characters ",
  }),
  nationalCode: Joi.string().required().length(10).messages({
    "any.required": "nationalCode is required",
    "string.base": "nationalCode format must be string",
    "string.length": "the length of nationalCode must be 10 characters ",
  }),
}).unknown(true);
module.exports = {
  sendOtpValidation,
  checkOtpValidation,
  registerDoctorValidation,
  registerPatientValidation
};
