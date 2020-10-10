const { Joi } = require('celebrate');

const editProfileSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
}).options({ abortEarly: false });

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(3).max(30).required(),
  newPassword: Joi.string().min(3).max(30).required(),
  confirmNewPassword: Joi.string().min(3).max(30).required(),
}).options({ abortEarly: false });

module.exports = {
  editProfileSchema,
  changePasswordSchema,
};
