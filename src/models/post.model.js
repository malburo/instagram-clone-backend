const { model, Schema } = require('mongoose');

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    caption: { type: String },
    postPictureUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual('reactions', {
  ref: 'reactions',
  localField: '_id',
  foreignField: 'postId',
});
PostSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'postId',
});

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });
const Post = model('posts', PostSchema);

module.exports = Post;
