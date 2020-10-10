const User = require('../../models/user.model');
const Response = require('../../helpers/response.helper');

exports.username = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return Response.error(res, { checkUsernameParams: false });
    }
    if (user.username === req.user.username) {
      res.locals.isCurrentUser = true;
    } else {
      res.locals.isCurrentUser = false;
    }
    next();
  } catch (error) {
    return next(error);
  }
};
