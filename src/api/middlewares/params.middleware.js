const User = require('../../models/user.model');

exports.username = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return next({
        status: 400,
        checkUsernameParams: false,
      });
    }
    if (user.username === req.user.username) {
      res.locals.isCurrentUser = true;
    } else {
      res.locals.isCurrentUser = false;
    }
    next();
  } catch (err) {
    next(err);
  }
};
