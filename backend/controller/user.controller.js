import { User } from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";


export const register = async(req,res)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            success:false,
            message:"No file uploaded"
        });
    }

    const {photo} = req.files;
    const allowFormats = ["image/jpeg","image/png","image/jpg"];
    if(!allowFormats.includes(photo.mimetype)){
        return res.status(400).json({
            success:false,
            message:"Please upload image in jpg,jpeg or png format"
        });
    }

    const{name,password,email,role,education,phone} = req.body;
    if(!name || !email || !password || !role || !phone || !education || !photo){
        return res.status(400).json({
            success:"false",
            message:"All fields are required"
        });
    }
    const user = await User.findOne({email});
    if (user){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        });
    }

    //response from cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath
    );
    if(!cloudinaryResponse){
        return res.status(400).json({
            success:false,
            message:"Error uploading image to cloudinary"
        });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        name,
        password:hashedPassword,
        email,
        role: role.toLowerCase(),
        education,
        phone,
        photo:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.url,
        }
    });
await newUser.save();
if(newUser){
    return res.status(201).json({
        success:true,
        message:"User are registered successfully",
        data:newUser
    })
}
}
