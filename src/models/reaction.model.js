const { model, Schema } = require('mongoose');

const ReactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
      required: true,
    },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

const Reaction = model('reactions', ReactionSchema);

module.exports = Reaction;
