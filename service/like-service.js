import LikeRepository from "../repository/like-repository.js";
import TweetRepository from "../repository/tweet-repository.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (modelType == "Tweet") {
     var likeable = await this.tweetRepository.find(modelId).populate({path: 'likes'});
    //    likeable =  await likeable.populate("likes");

    } else if (modelType == "Comment") {
        // work rem.

    } else {
      throw new Error("Invalid model type");
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
