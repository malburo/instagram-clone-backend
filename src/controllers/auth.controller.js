const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const Response = require('../helpers/response.helper');

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    delete user._doc.password;
    return Response.success(res, { currentUser: user });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    // check user
    if (!user) {
      return Response.error(
        res,
        { message: 'Username không tồn tại', key: 'username' },
        401
      );
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword === false) {
      return Response.error(
        res,
        { message: 'Password không đúng', key: 'password' },
        401
      );
    }
    // generate access token
    const access_token = jwt.sign(
      { id: user.id, username: user.username, fullname: user.fullname },
      process.env.SECRET
    );
    Response.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { fullname, username, email, password } = req.body;
    const [checkEmail, checkUsername] = await Promise.all([
      User.find({ email: req.body.email }),
      User.find({ username: req.body.username }),
    ]);
    if (checkUsername.length) {
      return Response.error(
        res,
        { message: 'Username này đã được sử dụng', key: 'username' },
        401
      );
    }
    if (checkEmail.length) {
      return Response.error(res, {
        message: 'Email này đã được sử dụng',
        key: 'email',
      });
    }
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    // generate access token
    const access_token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        fullname: newUser.fullname,
      },
      process.env.SECRET
    );
    Response.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return Response.error(
        res,
        { message: 'Email không tồn tại', key: 'email' },
        401
      );
    }
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
    Response.success(res, { message: 'success' });
  } catch (error) {
    return next(error);
  }
};

exports.verifyMailResetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    // check access token
    jwt.verify(token, process.env.SECRET);
    Response.success(res, { message: 'success' });
  } catch (error) {
    return next(error);
  }
};

exports.newPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // check access token
    const decoded = jwt.verify(token, process.env.SECRET);
    const { userId } = decoded;

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    Response.success(res, { message: 'success' });
  } catch (error) {
    return next(error);
  }
};
