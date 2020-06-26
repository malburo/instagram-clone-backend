const User = require('../models/user.model');
exports.get = async (req, res, next) => {
  try {
    const user = await User.findOne().populate('posts');
    console.log(user);
    return res.status(201).json({
      user: user.posts,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
