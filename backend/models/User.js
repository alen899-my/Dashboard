const mongoose=require("mongoose")
const user=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    phone:{type:String},
    password:{type:String},
    Department:{type:String},



},{timestamps:true})
module.exports=mongoose.model('user',user);