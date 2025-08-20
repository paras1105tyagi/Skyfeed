import LikeService from '../service/like-service.js';

const likeService = new LikeService();

export const toggleLike = async(req,res) => {
try {
     const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
      res.status(201).json({
        success: true,
        data: response,
        message: 'successfully toggled like',
        err: {}
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        data: {},
        message: 'Something went wrong',
        err: error
    })
}
}