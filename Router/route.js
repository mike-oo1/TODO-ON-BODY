const express =require("express")
const {signup,signIn,changePassword,getOne,getAll,updateTasks,deletedTasks}=require("../Controllers/controller")
const Router = express()

Router.route("/signup").post(signup)
Router.route("/signin").post(signIn)
// Router.route("/oldPass/:id").get(findOldPass)
Router.route("/changepass/:id").patch(changePassword)
Router.route("/getone/:id").get(getOne)
Router.route("/getall").get(getAll)
Router.route("/update/:id").patch(updateTasks)
Router.route("/delete/:id").delete(deletedTasks)



module.exports=Router