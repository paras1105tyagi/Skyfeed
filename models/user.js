import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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


userSchema.methods.comparePassword = function compare(password){
    // console.log("hi");
    return bcrypt.compareSync(password, this.password);

}

userSchema.methods.genJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email},'Skyfeed_secret',{
        expiresIn: '1d'
    });
}

const User = mongoose.model('User',userSchema);

export default User;
