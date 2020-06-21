const jwt = require('jsonwebtoken');

exports.ensureAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      next(Error('No token provided'));
      return;
    }
    const user = await jwt.verify(token, process.env.SECRET);
    req.user = user;
  } catch (err) {
    next({ message: 'Failed to authenticate token' });
  }
  next();
};
