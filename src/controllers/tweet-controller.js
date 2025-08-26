import TweetService from '../service/tweet-service.js';
const tweetService = new TweetService();
import upload from '../config/file-upload-s3-config.js';

const singleUploader = upload.single('image');


export const createTweet = async(req,res) => {
    try {
        singleUploader(req,res,async function(err,data){
          if(err){
            return res.status(500).json({
                error: err
            });
           
          }
         console.log('Image url is', req.file);
         const dataa = {...req.body};
        //  
         dataa.image = req.file.location;

         const response = await tweetService.create(dataa);
        return res.status(201).json({
            success: true,
            message: "Tweet created successfully",
            data: response, 
            err:{},
        });
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


