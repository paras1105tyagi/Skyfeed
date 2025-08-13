const mongoose = require('mongoose');


const connect = async()=>{
    await mongoose.connect('mongodb+srv://parastyagi1902:w3ge5RK7bsEI5Cpb@cluster0.gymzcnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

}
module.exports = connect;
