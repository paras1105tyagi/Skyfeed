import LikeService from '../service/like-service.js';

const likeService = new LikeService();

export const toggleLike = async(req,res) => {
try {
     const userId = req.body.userId || req.query.userId;
     const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, userId);
      res.status(201).json({
        success: true,
        data: response,
        message: 'successfully toggled like',
        err: {}
    })
} catch (error) {
    const message = error?.message || 'Something went wrong';
    const status = message.includes('Missing required parameter') ? 400
                 : message.includes('not found') ? 404
                 : 500;
    console.log(error);
    res.status(status).json({
        success: false,
        data: {},
        message,
        err: { message }
    })
}
}