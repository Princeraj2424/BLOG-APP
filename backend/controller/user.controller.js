import { User } from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import  {createTokenAndSaveCookies}  from "../jwt/AuthToken.js";


export const register = async(req,res)=>{
    try{
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
    const token = await createTokenAndSaveCookies(newUser._id,res);
    if(newUser){
        console.log("register:",token);
        return res.status(201).json({
            success:true,
            message:"User are registered successfully",
            data:newUser, token:token

        });
    }
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

//Login Controller
export const login = async (req, res)=>{
    const {email,password,role}=req.body;
    try{
        if (!email ||!password ||!role){
            return res.status(400).json({
                success:false,
                message:"Fill the required fields"
            });
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        if(!user.password){
            return res.status(400).json({
                success:false,
                message:"User password is missing"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email and password"
            });
        }

        if(user.role !== role){
            return res.status(400).json({
                success:false,
                message:`Given role ${role} not found`
            });
        }

        //saved token in cookies
        const token = await createTokenAndSaveCookies(user._id,res);
        console.log("login:",token);
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:user,
            token:token
        });   

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

//Logout Controller
export const logout =(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({
            success:true,
            message:"User Logged out successfully"
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}

    

