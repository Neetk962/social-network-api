const { Schema, model } = requirer("mongoose");

const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      },
    ],
    friends: [this],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userschema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userschema);

module.exports = User;
