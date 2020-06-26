const { model, Schema } = require('mongoose');

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'posts',
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

const Comment = model('comments', CommentSchema);

module.exports = Comment;
