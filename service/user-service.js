import UserRepository from '../repository/user-repository.js';

class UserService {
    constructor(){
       this.userRepository = new UserRepository;
    }

    

    async signup(data){
        // console.log(this.userRepository);
        // it prints that this repo contains the model user
// UserRepository { model: Model { User } }
        
        console.log(UserRepository);

        // this print that the user repository extends the crud repository
// [class UserRepository extends CrudRepository]

        try{
        const user = await this.userRepository.create(data);
        return user;  
        }catch(error){
            console.log("Error present in user-service layer");
            throw error;
        }
       
    }

    async getUserByEmail(email){
        try{
           const user = await this.userRepository.findBy({email});
           return user;
        }catch(error){
            throw error;
        }
    }
}

export default UserService;
