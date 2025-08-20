import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }

}, {timestamps : true  
});

userSchema.pre('save',async function (next) {
const user = this;
const SALT = await bcrypt.genSalt(10);
const encryptedPassword = bcrypt.hashSync(user.password, SALT);
user.password = encryptedPassword;
next();
});


const User = mongoose.model('User',userSchema);

export default User;
