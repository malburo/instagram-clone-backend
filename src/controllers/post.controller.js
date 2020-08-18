const Post = require('../models/post.model');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');

const fs = require('fs');

exports.get = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate({ path: 'likes' })
      .populate({
        path: 'comments',
        populate: { path: 'userId' },
      })
      .populate({ path: 'userId', select: 'profilePictureUrl username' })
      .sort({ _id: -1 });
    return res.status(201).json({
      posts: posts,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

exports.create = async (req, res, next) => {
  try {
    if (req.file) {
      let postPictureUrl = null;
      await cloudinary.uploader.upload(req.file.path, async (error, result) => {
        postPictureUrl = result.url;
      });
      fs.unlinkSync(req.file.path);
      const newPost = await Post.create({
        userId: req.user._id,
        caption: req.body.caption,
        postPictureUrl,
      });
      const post = await Post.findById(newPost._id)
        .populate({ path: 'likes' })
        .populate('comments')
        .populate({ path: 'userId', select: 'profilePictureUrl username' });
      return res.status(201).json({
        newPost: post,
      });
    } else {
      next({ status: 400, message: 'upload ko thanh cong' });
    }
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

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

exports.comment = async (req, res, next) => {
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