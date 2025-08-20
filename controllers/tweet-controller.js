import TweetService from '../service/tweet-service.js';
const tweetService = new TweetService();



export const createTweet = async(req,res) => {
    try {
        const response = await tweetService.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Tweet created successfully",
            data: response,
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data:{},
            err:error,
        });
    }
}


export const getTweet = async(req,res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            success: true,
            message: "Tweet retrieved successfully",
            data: response,
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data:{},
            err:error,
        });
    }
}


