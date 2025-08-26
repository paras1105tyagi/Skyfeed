import mongoose from "mongoose";
import Tweet from "../models/tweet.js";

const hastagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,

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

export default Hashtag;