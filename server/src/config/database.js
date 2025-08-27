// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
// console.log("MONGO_URI:", MONGO_URI);
const connect = async()=>{
    await mongoose.connect(MONGO_URI,);

}
export default connect;
