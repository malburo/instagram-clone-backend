const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Response = require("../helpers/response.helper");

exports.editProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { fullname, username, email } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { fullname, username, email } },
      { new: true }
    );
    delete user._doc.password;
    Response.success(res, { user }, 201);
  } catch (error) {
    return next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const saltRounds = 10;
    const { currentPassword, newPassword } = req.body;
    const infoCurrentUser = await User.findById(id);
    const comparePassword = await bcrypt.compare(
      currentPassword,
      infoCurrentUser.password
    );
    if (!comparePassword) {
      return Response.error(res, { message: "Password incorect !" }, 401);
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { password: hashedPassword } }
    );
    const access_token = jwt.sign(
      { id: user._id, username: user.username, fullname: user.fullname },
      process.env.SECRET
    );
    Response.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};
