import express from 'express';
import passport from 'passport';
import connect from './src/config/database.js';
import cors from 'cors';

import apiRoutes from './src/routes/index.js';
import UserRepository from './src/repository/user-repository.js';
import TweetRepository from './src/repository/tweet-repository.js';
import LikeService from './src/service/like-service.js';
import { passportAuth } from './src/config/jwt-middleware.js';

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await connect();
  console.log("Database connected successfully");

  const userRepo = new UserRepository();
  const tweetRepo = new TweetRepository();
  const tweets = await tweetRepo.getAll(0, 10);

  // testing purpose code (commented for now)
  // const user = await userRepo.create({
  //   email: 'parastyagi1105@gmail.com',
  //   password: '123456',
  //   name: 'Paras'
  // });
});
