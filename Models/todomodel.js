const mongoose =require("mongoose")

const taskSchema = new mongoose.Schema({
    Tasks:{
        type:String,
        required:[true,"tasks required"]
    },
    link:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    }
})



const Model = mongoose.model("Task",taskSchema)
module.exports = Model