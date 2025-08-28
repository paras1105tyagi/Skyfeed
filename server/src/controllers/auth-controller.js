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
        const token = await userService.signin(req.body);
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

export const getAll = async(req, res) => {
    try{
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const users = await userService.getAll(limit, offset);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched all users',
            data: users,
        })
    }
    catch(error){
        return res.status(500).json({
            message: 'Something went wrong at auth-controller',
            data: {},
            err: error,
            success: false,
        })
    }
}