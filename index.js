import express from 'express';

import connect from './config/database.js';

// import service from './service/tweet-service.js';

import apiRoutes from './routes/index.js';
import UserRepository from './repository/user-repository.js';
import TweetRepository from './repository/tweet-repository.js';
import LikeService from './service/like-service.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(3000,async()=>{
    console.log("Server is running on port 3000");
    await connect();
    console.log("Database connected successfully");
    // let serv = new service();
    // await serv.create({
    //     content: 'Captial #FUN #BAJRANGBALI',
    // })
     const userRepo = new UserRepository();
     const tweetRepo = new TweetRepository();
     const tweets = await  tweetRepo.getAll(0,10);
    //  const user = await userRepo.create({
    //     email: 'parastyagi1105@gmail.com',
    //     password: '123456',
    //     name: 'Paras'
    //  });
      // const user = await userRepo.getAll();
      
      // const likeService = new LikeService();
      
      // await likeService.toggleLike(tweets[0].id,'Tweet',user[0].id);

      

});


// pop

