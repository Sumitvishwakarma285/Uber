const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname must be of 3 characters long']
        },
        lastname:{
            type:String,
            minlength:[3,'lastname must be of 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be of 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,       
            minlength:[3,'color must be of 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be of 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be greater than 0']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number
        }
    }
});

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this}, 'your_jwt_secret_key', {expiresIn:'24h'});
    return token;
}

captainSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel=mongoose.model('Captain',captainSchema);

module.exports=captainModel;