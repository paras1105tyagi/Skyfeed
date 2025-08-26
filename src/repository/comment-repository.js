import CrudRepository from "./crud-repository.js";
import Comment from "../models/comment.js";


class CommentRepository extends CrudRepository {
      constructor(){
        super(Comment);
      }

      find(id){
        try {
            const comment = Comment.findById(id);
            return comment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
      


}

export default CommentRepository;

