const authRouter = require('./auth.route');
const postRouter = require('./post.route');
const profileRouter = require('./profile.route');
const { ensureAuthMiddleware } = require('../middlewares/auth.middleware');

const route = app => {
  app.use('/api/auth', authRouter);
  app.use('/api/post',ensureAuthMiddleware, postRouter);
  app.use('/api/profile',ensureAuthMiddleware, profileRouter);
};

module.exports = route;
