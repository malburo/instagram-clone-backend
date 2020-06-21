const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        username: 'Username không tồn tại',
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({
        password: 'Password không đúng',
      });
    }
    delete user._doc.password;
    const accessToken = jwt.sign(user._doc, process.env.SECRET);
    res.json({ user, accessToken });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { fullname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    delete newUser._doc.password;
    const accessToken = jwt.sign(newUser._doc, process.env.SECRET);
    return res.status(201).json({
      user: newUser,
      accessToken,
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};

exports.reset = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: 'Email không tồn tại',
      });
    }
    res.json({ message: 'Đã gửi email' });
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};
