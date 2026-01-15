import { User } from "../models/user.models.js";

export const register = async(req,res)=>{
const{name,email,password, role,phone,education} = req.body;
if(!name || !email || !password || !role || !phone || !education){
    return res.status(400).json({
        success:"false",
        message:"All fields are required"
    });
}
const user = await User.findOne({email});
if (user){
    return res.status(400).json({
        success:"false",
        message:"User already exists"
    });
}

const newUser = await new User({
    name,
    email,
    password,
    role,
    phone,
    education
});
if(newUser){
    return res.status(201).json({
        success:true,
        message:"User are registered"
    })
}
}
