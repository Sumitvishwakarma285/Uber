const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainServices = require('../services/captain.service');
const blackListToken=require('../models/blacklisttoken.model');



module.exports.registerCaptain = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
};
const { fullname, email, password, vehicle } = req.body;

const captainExists = await captainModel.findOne({ email });
if (captainExists) {
return res.status(400).json({ message: 'Captain already exists' });
}

const hashPassword=await captainModel.hashPassword(password);

const captain = await captainServices.createCaptain({
fullname,
email,
password:hashPassword,
color:vehicle.color,
plate:vehicle.plate,
capacity:vehicle.capacity,
vehicleType:vehicle.vehicleType
});
const token = captain.generateAuthToken();

res.status(201).json({ captain, token });


}

module.exports.loginCaptain = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
const { email, password } = req.body;

const captain = await captainModel.findOne({ email }).select('+password');
if (!captain) {
return res.status(401).json({ message: 'Invalid Email or Password' });
}
const isMatch = await captain.matchPassword(password);

if (!isMatch) {
return res.status(401).json({ message: 'Invalid Email or Password' });
}
const token = captain.generateAuthToken();

res.cookie('token', token);

res.status(200).json({ token, captain });

}

module.exports.getCaptainProfile= async (req,res,next)=>{
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain=async (req,res,next)=>{

    res.clearCookie('token');
    const token= req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListToken.create({token});

    res.status(200).json({message:'Logged Out Successfully'});
}