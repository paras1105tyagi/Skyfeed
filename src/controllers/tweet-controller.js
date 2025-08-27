import TweetService from '../service/tweet-service.js';
const tweetService = new TweetService();
import upload from '../config/file-upload-s3-config.js';

const singleUploader = upload.single('image');


export const createTweet = async (req, res) => {
  try {
    singleUploader(req, res, async function (err, data) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "File upload failed",
          data: {},
          err: err,
        });
      }

      const dataa = { ...req.body };

      if (req.file && req.file.location) {
        dataa.image = req.file.location; // only add image if present
      }

      const response = await tweetService.create(dataa);

      return res.status(201).json({
        success: true,
        message: "Tweet created successfully",
        data: response,
        err: {},
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};


export const getTweet = async(req,res) => {
    try {
        const response = await tweetService.get(req.params.id);
        console.log('req received at controller', req.params.id);
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

export const getTweets = async(req,res) => {
    try {
        const response = await tweetService.getAll(0,10);
        return res.status(201).json({
            success: true,
            message: "Tweets retrieved successfully",
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


