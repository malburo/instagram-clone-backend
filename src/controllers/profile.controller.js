const User = require('../models/user.model');
const fs = require('fs');
const cloudinary = require('../configs/cloudinary.config');
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
    const { path } = req.file;
    const profilePicture = await cloudinary.uploads(path, 'Instagram/Avatar');
    const profilePictureUrl = profilePicture.url;
    fs.unlinkSync(path);

    await User.updateOne({ _id: userId }, { $set: { profilePictureUrl } });
    return res.status(201).json({
      profilePictureUrl,
    });
  } catch (err) {
    return next(err);
  }
};
