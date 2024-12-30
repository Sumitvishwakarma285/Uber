const express =require('express');
const router =express.Router();
const captainController=require('../controllers/captain.controllers');
const {body}=require('express-validator');

router.post('/register',[
body('fullname.firstname').isLength({min:3}).withMessage('firstname must be of 3 characters long'),
body('email').isEmail().withMessage('Please enter a valid email'),
body('password').isLength({min:6}).withMessage('password must be of 6 characters long'),
body('vehicle.color').isLength({min:3}).withMessage('color must be of 3 characters long'),  
body('vehicle.plate').isLength({min:3}).withMessage('plate must be of 3 characters long'),
body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be greater than 0'),
body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('vehicleType must be car,bike or auto'),

],captainController.registerCaptain);

module.exports=router;

