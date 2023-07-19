const express =require("express")
const {signup,signIn,resetPass,getOneTodo,getAll,updateTasks,deletedTasks}=require("../Controllers/controller")
const {newTodo} =require("../Controllers/todoController")
const Router = express()

Router.route("/signup").post(signup)
Router.route("/signin").post(signIn)

Router.route("/createTodo/:id").post(newTodo)
// Router.route("/oldPass/:id").get(findOldPass)
Router.route("/changepass/:id").patch(resetPass)
Router.route("/getone/:id").get(getOneTodo)
Router.route("/getall").get(getAll)
Router.route("/update/:id").patch(updateTasks)
Router.route("/delete/:id").delete(deletedTasks)



module.exports=Router