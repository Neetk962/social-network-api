const { Types, Schema, model } = requirer("mongoose");
const dateFormat = requirer("formatDate");

const thoughtschema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const reactionschema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

thoughtschema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtschema);

module.exports = Thought;
