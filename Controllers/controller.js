const todoModel =require("../Models/model")
const jwt =require("jsonwebtoken")
const bcryptjs =require("bcryptjs")

exports.signup = async(req,res)=>{
    try {
        const {Name,Email,Password,Tasks,isAdmin}= req.body
        const salt =bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(Password,salt)
        const data ={
            Name,
            Email,
            Password:hash,
            Tasks,
            isAdmin
        }
        const createTodo= new todoModel(data)
        const newToken = jwt.sign({
            Name,
            Password
        },process.env.JWT_TOKEN,{expiresIn: "1d"})
        createTodo.Token = newToken
        await createTodo.save()
        res.status(200).json({
            message:"created",
            data:createTodo
        })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }

}
exports.signIn = async(req,res)=>{
    try {
        const{Name,Password}=req.body
        const check =await todoModel.findOne({Name:Name})
        if(!check){
            res.status(400).json({
                message:" OPPS!!! wrong details"
            })
        }
        const isPassword = await bcryptjs.compare(Password,check.Password)
        if(!isPassword){
            res.status(400).json({
                message: "OPPS!!! wrong password"
            })
        }else{
                    // GENERATING LOGIN TOKEN
const createToken =jwt.sign({
    Name,
    Password
},process.env.JWT_TOKEN,{expiresIn :"1d"})
check.Token =createToken
await check.save()
res.status(201).json({
    status:"successful",
    message:"logged in successful",
    data:check
})
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

exports.changePassword=async(req,res)=>{
    try {
        const {Password}=req.body
       const id =req.params.id
       const salt =bcryptjs.genSaltSync(10)
       const hash = bcryptjs.hashSync(Password,salt)
       const resetDetails={
        // userId:req.body.userId,
        // Token:req.body.Token,
        Password:hash
    }
        const result =await todoModel.findByIdAndUpdate(id,resetDetails,{Password:hash},{new:true})

        if(!result){
            res.status(400).json({
                message:"cannot reset password"
            })
        }else{
            res.status(200).json({
                status:"success",
                message:"password reset successfully",
                data:result
            })
        }
        const createToken =jwt.sign({
            Password
        },process.env.JWT_TOKEN,{expiresIn :"1d"})
        check.Token =createToken
        await check.save()
        res.status(201).json({
            status:"successful",
            message:"password changed  successfully",
            data:check
        })
    } catch (error) {
        res.send(error.message)
      
        
    }
}
exports.getOne = async(req,res)=>{
    try {
        const id = req.params.id
        const getOne = await todoModel.findById(id)
        if(!getOne){
            res.status(404).json({
                message:`the todo with id ${id} is not found`
            })
        }else{
            res.status(200).json({
                status:"success",
                message:`here is the users todo with id ${id}`,
                data:getOne
            })
        }
        
    } catch (error) {
        
    }
}

exports.getAll =async(req,res)=>{
    try {
    const getTasks = await todoModel.find()
    if(!getTasks){
        res.status(404).json({
            message:"no task found"
        })
    }else{
        res.status(200).json({
            message:"here are all the tasks created",
            data:getTasks
        })
    }

        
    } catch (error) {
        
    }
}

exports.updateTasks =async(req,res)=>{
    try {
        const{Name,Email,Password,isAdmin,Tasks}=req.body
        const id =req.params.id
        const update = await todoModel.findByIdAndUpdate(id)
        if(!update){
            res.status(500).json({
                message:"failed to update"
            })
        }else if(update == 0){
            res.status(205).json({
                message:"you didnt update anything",
                data:update
            })

        }else{
            const data={
                Name,
                Email,
                Password,
                isAdmin,
                Tasks
            }
            res.status(200).json({
                message:"updated successfully",
                data:update
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}
exports.deletedTasks =async(req,res)=>{
    try {
        const id =req.params.id
        const deleted = await todoModel.findByIdAndDelete(id)
            res.status(200).json({
                message:"deleted successfully",
                data:deleted
            })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}