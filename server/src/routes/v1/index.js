import express from 'express';

import {createTweet,getTweet, getTweets} from '../../controllers/tweet-controller.js'
import { toggleLike } from '../../controllers/like-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { signup,login,getAll } from '../../controllers/auth-controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
// import { getUser } from '../../controllers/use-controller.js';

const router = express.Router();
router.get('/tweets/:id',authenticate,getTweet);
router.get('/tweets',getTweets);
router.post('/tweets',authenticate,createTweet);
router.post('/likes/toggle',authenticate,toggleLike);
router.post('/comments',authenticate,createComment);
router.post('/signup',signup);
router.post('/login',login);
router.get('/users',authenticate,getAll);
router.get('/test',(req,res)=>{
    console.log("Skyfeed backend is working");
    return res.send("Skyfeed backend is working smoothly");
})
export default router;