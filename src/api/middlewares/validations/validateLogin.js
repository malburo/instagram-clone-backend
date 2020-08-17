module.exports = async (req, res, next) => {
  try {
    let errors = {};
    if (!req.body.username && !req.body.email) {
      errors.username = 'Vui lòng cung cấp username.';
    }
    if (!req.body.password) {
      errors.password = 'Vui lòng cung cấp mật khẩu.';
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
