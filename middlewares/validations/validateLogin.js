module.exports = async (req, res, next) => {
  try {
    let errors = {};
    if (!req.body.username && !req.body.email) {
      errors.username = "Vui lòng cung cấp username.";
    }
    if (!req.body.password) {
      errors.password = "Vui lòng cung cấp mật khẩu.";
    }
    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ ...errors });
    }
    next();
  } catch (err) {
    return next({ status: 400, message: err });
  }
};
