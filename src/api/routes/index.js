const authRouter = require('./auth.route');
const postRouter = require('./post.route');
const profileRouter = require('./profile.route');
const accountRouter = require('./account.route');

const { ensureAuthMiddleware } = require('../middlewares/auth.middleware');

const route = app => {
  app.use('/api/auth', authRouter);
  app.use('/api/post', ensureAuthMiddleware, postRouter);
  app.use('/api/profile', ensureAuthMiddleware, profileRouter);
  app.use('/api/account', ensureAuthMiddleware, accountRouter);
};

module.exports = route;
