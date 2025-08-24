import mongoose from "mongoose";
import Hashtag from "../models/hastags.js";
import Comment from "./comment.js";
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [250, "Tweet content should not exceed 250 characters"],
    },

    hashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      } 
    ],
    comments: [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
