const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    let errors = {};
    if (!req.body.email) {
      errors.email = 'Vui lòng cung cấp email.';
    }
    if (!user) {
      errors.email = 'Email không tồn tại';
    }
    if (Object.keys(errors).length !== 0) {
      return next({
        status: 422,
        errors: { ...errors },
      });
    }
    next();
  } catch (err) {
    return next(err);
  }
};
