import TweetRepository from '../repository/tweet-repository.js';
import HashtagRepository from '../repository/hashtag-repository.js';
class TweetService{
 constructor(){
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();

 }


    async create(data) {
        const content = data.content;
        
        let tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag)=>tag.substring(1));
        // console.log(tags);
        tags = tags.map(tag => tag.toLowerCase());
        
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        // console.log(alreadyPresentTags);
        let titleOfPresentTags = alreadyPresentTags.map(tags => tags.title);
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));
        newTags = newTags.map(tag=>{
            return {
                title: tag,
                tweets: [tweet.id]
            }
        });


        const response = await this.hashtagRepository.bulkCreate(newTags);

        alreadyPresentTags.forEach((tag) =>{
                  tag.tweets.push(tweet.id);
                  tag.save();
        });
        
        // Update tweet with hashtag references
        const allHashtagIds = [
            ...alreadyPresentTags.map(tag => tag._id),
            ...response.map(tag => tag._id)
        ];
        
        // Update the tweet to include hashtag references
        await this.tweetRepository.update(tweet.id, { hashtags: allHashtagIds });
        
        // Return the updated tweet with hashtags
        const updatedTweet = await this.tweetRepository.get(tweet.id);
        return updatedTweet;
        // return tweet;

    }



    
 
}


export default TweetService;
 