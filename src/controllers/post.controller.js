const Post = require("../models/post.model");
const Reaction = require("../models/reaction.model");
const Comment = require("../models/comment.model");

const cloudinary = require("../configs/cloudinary.config");
const Response = require("../helpers/response.helper");
const fs = require("fs");

exports.getPostByLimit = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;
    const [totalPost, posts] = await Promise.all([
      Post.find().countDocuments(),
      Post.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({ _id: -1 })
        .populate({ path: "reactions" })
        .populate({
          path: "comments",
          populate: { path: "userId" },
        })
        .populate({ path: "userId", select: "profilePictureUrl username" }),
    ]);
    Response.success(res, { posts: posts, totalPost: totalPost }, 201);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;

    const uploader = async (path) =>
      await cloudinary.uploads(path, "Instagram/Posts");
    const postListPictureUrl = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      postListPictureUrl.push(newPath);
      fs.unlinkSync(path);
    }
    let newPost = await Post.create({
      userId,
      caption,
      postListPictureUrl,
    });
    newPost = await newPost
      .populate("reactions")
      .populate("comments")
      .populate({ path: "userId", select: "profilePictureUrl username" })
      .execPopulate();
    Response.success(res, { newPost }, 201);
  } catch (error) {
    return next(error);
  }
};

exports.reaction = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const check = await Reaction.findOne({ postId, userId });
    if (check === null) {
      const reaction = await Reaction.create({
        userId,
        postId,
        type: "like",
      });
      return Response.success(res, { reaction }, 201);
    }
    await Reaction.findOneAndDelete({
      userId,
      postId,
    });
    Response.success(res, { reaction: { userId, postId } }, 201);
  } catch (error) {
    return next(error);
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
    Response.success(res, { newComment }, 201);
  } catch (error) {
    return next(error);
  }
};
