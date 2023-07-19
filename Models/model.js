const mongoose =require("mongoose")

const todoList = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Name is required"]
    },
    Email:{
        type:String,
        required:[true,"Email is required"]
    },
    Password:{
        type:String,
        required:[true,"Password is required"]
    },
    Token:{
        type:String
    },
    isAdmin:{
        type:Boolean
    },
    Tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }],
},{timestamps:true})

const todo =mongoose.model("todo",todoList)
module.exports =todo