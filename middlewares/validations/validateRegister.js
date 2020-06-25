const User = require('../../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const [checkEmail, checkUsername] = await Promise.all([
      User.find({ email: req.body.email }),
      User.find({ username: req.body.username }),
    ]);
    let errors = {};
    if (!req.body.fullname) {
      errors.fullname = 'Vui lòng cung cấp họ và tên.';
    }
    if (!req.body.email) {
      errors.email = 'Vui lòng cung cấp email.';
    }
    if (!req.body.password) {
      errors.password = 'Vui lòng cung cấp password.';
    }
    if (checkEmail.length) {
      errors.email = 'Email này đã được sử dụng';
    }
    if (checkUsername.length) {
      errors.isExistsUsername = 'Username này đã được sử dụng';
    }
    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ ...errors });
    }
    next();
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
