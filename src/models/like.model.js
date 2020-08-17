const { model, Schema } = require('mongoose');

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'posts',
    },
    isLiked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Like = model('likes', LikeSchema);

module.exports = Like;
