const User = require('../models/user.model');
var fs = require('fs');
let cloudinary = require('cloudinary').v2;

exports.getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username })
      .select('profilePictureUrl username')
      .populate({
        path: 'posts',
        options: { sort: { _id: -1 } },
      });
    if (!profile) {
      return next({
        status: 400,
        checkUsernameParams: false,
      });
    }
    return res.status(201).json({
      profile,
    });
  } catch (err) {
    return next(err);
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
    return next(err);
  }
};
