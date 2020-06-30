const User = require('../models/user.model');
var fs = require('fs');
let cloudinary = require('cloudinary').v2;

exports.getPosts = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).populate({
      path: 'posts',
      options: { sort: { _id: -1 } },
    });
    if (profile === null) {
      return res.status(201).json({
        checkParams: false,
      });
    }
    if (Object.keys(profile).length === 0 && profile.constructor === Object) {
      return res.status(404).json({
        message: 'get failed',
      });
    }
    let isCurrentUser = false;
    if (username === req.user.username) {
      isCurrentUser = true;
    }
    return res.status(201).json({
      profile,
      checkParams: true,
      isCurrentUser,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

exports.changeAvatar = async (req, res, next) => {
  try {
    if (req.file) {
      let profilePictureUrl = null;
      await cloudinary.uploader.upload(req.file.path, async (error, result) => {
        profilePictureUrl = result.url;
      });
      fs.unlinkSync(req.file.path);
      await User.findByIdAndUpdate(req.user._id, { profilePictureUrl });
      return res.status(201).json({
        profilePictureUrl,
      });
    } else {
      next({ status: 400, message: 'upload ko thanh cong' });
    }
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
