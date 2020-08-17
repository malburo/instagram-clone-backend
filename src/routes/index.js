const authRouter = require('./auth.route');
const postRouter = require('./post.route');
const profileRouter = require('./profile.route');

const route = app => {
  app.use('/api/auth', authRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/profile', profileRouter);
};
module.exports = route;
