const users =require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')

// add user /register
exports.registerController = async (req,res)=>{
console.log("Inside registerController");
const {username,email,password} =req.body

try{
const exisitingUser = await users.findOne({email})
if(exisitingUser){
    res.status(406).json("User Already Existed!!!!!")
}else{
    const encryptedPassword = await  bcrypt.hash(password,10)
    const newUser = new users({
        username,email,password:encryptedPassword,profilePic:""
    })
    await newUser.save()
    res.status(200).json(newUser)
}

}catch(err){
    res.status(401).json(err)
}
}
// login
exports.loginController = async (req,res)=>{
    console.log("Inside LoginController");
    const{email,password} =req.body
    try{
        const exisitingUser =await users.findOne({email})
        if(exisitingUser){
            let isMatch =await bcrypt.compare(password,exisitingUser.password)
            if(exisitingUser.password == password || isMatch){
                const token =jwt.sign({userId:exisitingUser._id},process.env.JWT_PASSWORD )
                res.status(200).json({
                    user:exisitingUser,token
                })   
            }else{
                res.status(404).json("inavlid password")
            }
        }else{
            res.status(404).json("invalid email")
        }

    }catch(err){
        res.status(401).json(err)
    }
}
// get all users
exports.getAllUserController =async(req,res)=>{
    console.log("inside getAllUserController");
    try{
        // admin details excluded so skip(1)
        const allUsers =await users.find().skip(1)
        res.status(200).json(allUsers)

    }catch(err){
        res.status(401).json(err)
    }
}
// 