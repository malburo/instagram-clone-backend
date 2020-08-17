const Comment = require('../src/models/comment.model');

exports.create = async (req, res, next) => {
  try {
    const { comment, postId } = req.body;
    let newComment = await Comment.create({
      userId: req.user._id,
      postId,
      content: comment,
    });
    newComment._doc.userId = req.user;
    return res.status(201).json({
      data: newComment,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
