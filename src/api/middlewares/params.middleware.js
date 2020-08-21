const User = require('../../models/user.model');

exports.username = async (req, res, next) => {
  try {
    const { username } = req.params;
    const checkUsername = await User.findOne({ username });
    if (!checkUsername) {
      return next({
        status: 400,
        checkUsernameParams: false,
      });
    }
    res.locals.username = username;
    next();
  } catch (err) {
    next(err);
  }
};
