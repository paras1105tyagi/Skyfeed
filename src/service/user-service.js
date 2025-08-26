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

    async signin(data){
        try{
         const user = await this.getUserByEmail(data.email);
        if(!user){
            
                throw{
                  
                    message: 'no email found',
                }
            
        }
        // console.log("hii->1");
        if(!user.comparePassword(data.password)){
            throw{
                message: 'incorrect password',
               
            };
        }
        console.log("hii->2");
        const token = user.genJWT();
        return token;
    }catch(error){
        console.log("Error present in user-service layer");
        throw error;
    }
    }
}

export default UserService;
