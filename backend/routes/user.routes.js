const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/user.controllers');  
const {body}=require('express-validator');  

router.post('/register',[ 
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be of 3 characters long'), 
    body('password').isLength({min:5}).withMessage('Password must be of 5 characters long')
],userController.registerUser);


module.exports = router;    