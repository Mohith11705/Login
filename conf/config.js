const mongoose=require('mongoose');
const connect=mongoose.connect('mongodb://localhost:27017/users');

connect.then(()=>
{
    console.log('DB connected');
})
.catch(()=>{
    console.log('DB not connected')
})

const sc=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection=new mongoose.model('details',sc)
module.exports=collection;