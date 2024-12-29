const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser= async (req,res,next)=>{

    const token =req.cookies.token||req.header.authorization?.split('')[1];
    if(!token){
        return res.status(401).json({message:'Not Authorized'});    
    }

    const isBlacklisted = await userModel.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorised"});
    }

    try{
        const decoded=jwt.verify(token,'your_jwt_secret_key');  
        const user= await userModel.findById(decoded._id);

        req.user=user;  
        next();
    }
    catch(err){
        return res.status(401).json({message:'Not Authorized'});  
    }
}