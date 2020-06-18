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
        'https://scontent.fsof4-1.fna.fbcdn.net/v/t1.30497-1/c71.0.240.240a/p240x240/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=CD3ImewvDlgAX8f-QvY&_nc_ht=scontent.fsof4-1.fna&oh=782172992e9272da49f35f7f40ef8d63&oe=5EED0201',
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
