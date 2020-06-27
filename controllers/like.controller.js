const User = require('../models/user.model');
const Like = require('../models/like.model');
exports.get = async (req, res, next) => {
  try {
    const user = await User.findOne().populate('posts');
    return res.status(201).json({
      user: user.posts,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

exports.like = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;
    await Like.create({
      userId,
      postId,
      isLiked: true,
    });
    return res.status(201).json({
      data: {
        userId,
        postId,
      },
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

exports.unlike = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;
    await Like.findOneAndDelete({
      userId,
      postId,
    });
    return res.status(201).json({
      data: {
        userId,
        postId,
      },
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
