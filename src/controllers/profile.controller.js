const User = require('../models/user.model');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

exports.getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { isCurrentUser } = res.locals;
    const profile = await User.findOne({ username })
      .select('profilePictureUrl username')
      .populate({
        path: 'posts',
        options: { sort: { _id: -1 } },
      });
    profile._doc.isCurrentUser = isCurrentUser;
    return res.status(201).json({
      profile,
    });
  } catch (err) {
    return next(err);
  }
};

exports.changeAvatar = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profilePicture = await cloudinary.uploader.upload(req.file.path);
    const profilePictureUrl = profilePicture.secure_url;
    fs.unlinkSync(req.file.path);

    await User.updateOne({ _id: userId }, { $set: { profilePictureUrl } });
    return res.status(201).json({
      profilePictureUrl,
    });
  } catch (err) {
    return next(err);
  }
};
