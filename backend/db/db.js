const mongoose=require('mongoose');

function connectoDb(){mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log(`Mongodb is connected`);
    }).catch(err => console.log(err));
}

module.exports=connectoDb;    