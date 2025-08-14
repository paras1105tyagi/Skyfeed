const express = require('express');
const connect = require('./config/database');
const Hashtag = require('./models/hastags');

const app = express();


app.listen(3000,async()=>{
    console.log("Server is running on port 3000");
    await connect();
    console.log("Database connected successfully");


})