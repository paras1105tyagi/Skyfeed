import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  onModel:{
    type: String,
    required: true,
    enum: ["Post", "Comment"]
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel' 
    // refPath allows us to reference different models dynamically
  },
   user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   
}, {timestamps: true});

const Like = mongoose.model("Like", likeSchema);
export default Like;