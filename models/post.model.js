const { model, Schema } = require('mongoose');

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    caption: { type: String },
    postPictureUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual('likes', {
  ref: 'likes',
  localField: '_id',
  foreignField: 'postId',
});
PostSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'postId',
});

const Post = model('Post', PostSchema);

module.exports = Post;
