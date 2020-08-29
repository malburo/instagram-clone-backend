const Post = require('../models/post.model');
const Reaction = require('../models/reaction.model');
const Comment = require('../models/comment.model');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

exports.getPostByLimit = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;
    const [totalPost, posts] = await Promise.all([
      Post.find().count(),
      Post.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({ _id: -1 })
        .populate({ path: 'reactions' })
        .populate({
          path: 'comments',
          populate: { path: 'userId' },
        })
        .populate({ path: 'userId', select: 'profilePictureUrl username' }),
    ]);
    return res.status(201).json({
      posts: posts,
      totalPost: totalPost,
    });
  } catch (err) {
    return next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;

    const postPicture = await cloudinary.uploader.upload(req.file.path);
    const postPictureUrl = postPicture.url;
    fs.unlinkSync(req.file.path);

    const newPost = await Post.create({
      userId,
      caption,
      postPictureUrl,
    });
    const post = await Post.findById(newPost.id)
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
    const userId = req.user.id;
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
    const { content } = req.body;
    let newComment = await Comment.create({
      userId: req.user.id,
      postId,
      content,
    });
    newComment._doc.userId = req.user;
    return res.status(201).json({
      newComment,
    });
  } catch (err) {
    return next(err);
  }
};
