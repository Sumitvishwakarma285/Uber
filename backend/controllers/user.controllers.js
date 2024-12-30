const userModel = require('../models/user.model');  
const { validationResult } = require('express-validator'); 
const userServices = require('../services/user.services');
const BlacklistToken=require('../models/blacklisttoken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken(); 


    res.status(201).json({ token, user });
}

module.exports.loginUser=async (req,res,next)=>{
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});   
    }

    const {email,password}=req.body;

    const user= await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({meassage :'Invalid Email or Password'});
    }

    const isMatch= await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({message :'Invalid Email or Password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,user}); 

}

module.exports.getProfile=async (req,res,next)=>{
    res.status(200).json({user:req.user});  
}

module.exports.logoutUser= async (req,res,next)=>{
    res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization.split(' ')[1];

   await BlacklistToken.create({token});

    res.status(200).json({message:'Logged Out Successfully'});

}