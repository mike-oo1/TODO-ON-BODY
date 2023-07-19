const user =require("../Models/model")
const todo =require("../Models/todomodel")

exports.newTodo=async(req,res)=>{
    try {

        const users = await user.findById(req.params.id)

        const Todo = await todo.create(req.body)
        Todo.link =users
        Todo.save()
        users.Tasks.push(Todo)

        users.save()

        res.status(200).json({
            message:"created",
            data:Todo
        })
        
    } catch (error) {
        res.status(500).json({"data":error.message})
    }
}
