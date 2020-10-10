const { Joi } = require('celebrate');

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).options({ abortEarly: false });

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).options({ abortEarly: false });

const resetPasswordSchema = Joi.object({
  email: Joi.string().min(3).max(30).required(),
}).options({ abortEarly: false });

module.exports = {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
};
