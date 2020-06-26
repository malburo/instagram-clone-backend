const User = require('../models/user.model');
exports.get = async (req, res, next) => {
  try {
    const user = await User.findOne().populate('posts');
    console.log(user);
    return res.status(201).json({
      user: user.posts,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

exports.create = async (req, res, next) => {
  try {
    const { content, postId } = req.body;
    let newComment = await User.create({
      userId: req.user._id,
      postId,
      content,
    });
    return res.status(201).json({
      newComment: newComment,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
