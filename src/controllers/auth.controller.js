const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    delete user._doc.password;
    return res.status(201).json({
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next({
        status: 401,
        username: 'Username không tồn tại',
      });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      return next({
        status: 401,
        password: 'Password không đúng',
      });
    }
    const data = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
    };
    const access_token = jwt.sign(data, process.env.SECRET);
    res.status(201).json({ access_token });
  } catch (err) {
    return next(err);
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
    const data = {
      id: newUser.id,
      username: newUser.username,
      fullname: newUser.fullname,
    };
    const access_token = jwt.sign(data, process.env.SECRET);
    res.status(201).json({ access_token });
  } catch (err) {
    return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET,
      { expiresIn: '5m' }
    );
    const msg = {
      to: user.email,
      from: 'malburo2000@gmail.com', // Use the email address or domain you verified above
      subject: 'Reset password from malbuo',
      text: `Xin chao, de reset password ban hay an vao link duoi day:
      http://localhost:3000/auth/reset/${accessToken}
      `,
    };
    await sgMail.send(msg);

    res.status(200).json({ message: 'success' });
  } catch (err) {
    return next(err);
  }
};

exports.verifyMailResetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.SECRET);
    res.status(200);
  } catch (err) {
    return next(err);
  }
};

exports.newPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET);
    const { userId } = decoded;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({ message: 'Success!!' });
  } catch (err) {
    return next(err);
  }
};
