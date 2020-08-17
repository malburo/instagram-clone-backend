const User = require('../src/models/user.model');
const Like = require('../src/models/like.model');

exports.like = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;
    const like = await Like.create({
      userId,
      postId,
      isLiked: true,
    });
    return res.status(201).json({
      like,
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
      unlike: {
        userId,
        postId,
      },
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
