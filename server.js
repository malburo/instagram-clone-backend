require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');
const { ensureAuthMiddleware } = require('./middlewares/auth.middleware');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use('/api/auth', authRouter);
app.use('/api/posts', ensureAuthMiddleware, postRouter);
app.use((err, req, res, next) => {
  res.status(400).json(err);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
