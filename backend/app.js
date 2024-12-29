const dotenv=require('dotenv');
dotenv.config();
const connectDb=require('./db/db.js');
const express=require('express');
const app =express();
const cors=require('cors');
const userRoutes=require('./routes/user.routes');
const cookieParser=require('cookie-parser');

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/users',userRoutes);


module.exports=app;