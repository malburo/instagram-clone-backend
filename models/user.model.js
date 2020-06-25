const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: { required: true, type: String },
    username: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    email: { required: true, unique: true, type: String },
    password: { required: true, type: String },
    profilePictureUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/malburo/image/upload/v1593095165/default-avatar/default-avatar_oicvgv.jpg',
    },
  },
  {
    timestamps: true,
  }
);
userSchema.virtual('posts', {
  ref: 'posts',
  localField: '_id',
  foreignField: 'userId',
});
const User = mongoose.model('User', userSchema);

module.exports = User;
