const jwt = require('jsonwebtoken');
const Response = require('../../helpers/response.helper');

const ensureAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return Response.error(res, { message: 'No token provided' }, 401);
    }
    token = token.split(' ')[1];
    const user = await jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ensureAuthMiddleware,
};
