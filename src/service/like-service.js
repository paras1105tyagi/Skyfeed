import LikeRepository from "../repository/like-repository.js";
import TweetRepository from "../repository/tweet-repository.js";
import CommentRepository from "../repository/comment-repository.js";
import mongoose from "mongoose";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (!modelId) {
      throw new Error("Missing required parameter: modelId");
    }
    if (!mongoose.Types.ObjectId.isValid(modelId)) {
      throw new Error("Invalid modelId");
    }
    if (!modelType) {
      throw new Error("Missing required parameter: modelType");
    }
    if (!userId) {
      throw new Error("Missing required parameter: userId");
    }
    if (modelType == "Tweet") {
     var likeable = await this.tweetRepository.find(modelId).populate({path: 'likes'});
    //    likeable =  await likeable.populate("likes");

    } else if (modelType == "Comment") {
        var likeable = await this.commentRepository.find(modelId).populate({path: 'likes'});

    } else {
      throw new Error("Invalid model type");
    }

    if (!likeable) {
      throw new Error(`${modelType} not found`);
    }
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });

    if(exists){
         likeable.likes.pull(exists._id);
await likeable.save();
await exists.deleteOne();
var isRemoved = true;

    }else{
         const newLike = await this.likeRepository.create({
            user: userId,
            onModel: modelType,
            likeable: modelId
         });
         likeable.likes.push(newLike);
         await likeable.save();
         var isRemoved = false;
    }

    console.log(isRemoved);

    return isRemoved;
  }
}

export default LikeService;
