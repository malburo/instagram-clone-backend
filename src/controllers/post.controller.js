const Post = require('../models/post.model');
const Reaction = require('../models/reaction.model');
const Comment = require('../models/comment.model');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

exports.get = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate({ path: 'reactions' })
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
    return next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { caption } = req.body;

    const postPicture = await cloudinary.uploader.upload(req.file.path);
    const postPictureUrl = postPicture.url;
    fs.unlinkSync(req.file.path);
    console.log(req.file.path)
    const newPost = await Post.create({
      userId,
      caption,
      postPictureUrl,
    });
    const post = await Post.findById(newPost._id)
      .populate('reactions')
      .populate('comments')
      .populate({ path: 'userId', select: 'profilePictureUrl username' });
    return res.status(201).json({
      newPost: post,
    });
  } catch (err) {
    return next(err);
  }
};

exports.reaction = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { type } = req.body;
    const userId = req.user._id;
    if (type === 'like') {
      const reaction = await Reaction.create({
        userId,
        postId,
        type: 'like',
      });
      return res.status(201).json({
        reaction,
      });
    }
    // delete reaction
    const reaction = await Reaction.findOneAndDelete({
      userId,
      postId,
    });
    return res.status(201).json({
      reaction: {
        userId,
        postId,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.comment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
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
    return next(err);
  }
};
