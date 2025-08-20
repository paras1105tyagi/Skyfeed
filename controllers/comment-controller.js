import CommentService from '../service/comment-service.js';

const commentService = new CommentService();

export const createComment = async(req,res) => {
try {
     const response = await commentService.create(req.query.modelId,req.query.modelType,  req.body.userId, req.body.content);
      res.status(201).json({
        success: true,
        data: response,
        message: 'successfully created a new comment',
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