import UserService from '../service/user-service.js';

const userService = new UserService();


export const signup = async(req,res) => {
   try {
     const response = await userService.signup({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    return res.status(201).json({
        success: true,
        message: 'Successfully created a new user',
        data: response,
        err: {}
    })
   } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        data: {},
        success: true,
        err: err
      })
   }
}

export const login = async(req, res) => {
    try{
        // console.log("hii->0");
        const user = await userService.getUserByEmail(req.body.email);
        if(!user){
            return res.status(401).json(
                {
                    success:false,
                    message: 'no email found',
                }
            )
        }
        // console.log("hii->1");
        if(!user.comparePassword(req.body.password)){
            return res.status(401).json({
                message: 'incorrect password',
                success: false,
            });
        }
        console.log("hii->2");
        const token = user.genJWT();
        return res.status(201).json({
            success: true,
            message: 'Successfully logged in',
            data: token,
            err: {},
        })
    }catch(error){
        return res.status(500).json({
            message: 'Something went wrong at auth-controller',
            data: {},
            err: error,
            success: false,
        })
    }
}