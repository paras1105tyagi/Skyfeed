const Tweet = require("./tweet");
const mongoose = require("mongoose");

const hastagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);


const Hashtag = mongoose.model("Hashtag", hastagSchema);

module.exports = Hashtag;