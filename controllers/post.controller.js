const Post = require('../models/post.model');
var fs = require('fs');
let cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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
