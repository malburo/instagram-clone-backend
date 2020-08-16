const jwt = require('jsonwebtoken');

exports.ensureAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return next({
        status: 401,
        message: 'No token provided',
      });
    }
    token = token.split(' ')[1];
    const user = await jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (err) {
    return next({
      status: 401,
      message: 'Failed to authenticate token',
    });
  }
};
