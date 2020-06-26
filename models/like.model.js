const { model, Schema } = require('mongoose');

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'posts',
    },
    type: String,
  },
  {
    timestamps: true,
  }
);

const Like = model('likes', LikeSchema);

module.exports = Like;
