import User from '../models/user.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {

    constructor(){
        super(User);
    }

    async findBy(email){
        try {
            console.log(email);
            const response = await User.findOne(email);
            // response.save();
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAll(limit, offset){
        try{
            const users = await User.find({}).limit(limit).skip(offset);
            return users;
        }catch(error){
            throw error;
        }
    }
};

export default UserRepository;