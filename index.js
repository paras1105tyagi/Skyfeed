import express from 'express';

import connect from './config/database.js';

import service from './service/tweet-service.js';


const app = express();


app.listen(3000,async()=>{
    console.log("Server is running on port 3000");
    await connect();
    console.log("Database connected successfully");
    let serv = new service();
    await serv.create({
        content: 'Captial #FUN #BAJRANGBALI',
    })

})

