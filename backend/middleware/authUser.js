import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        console.log("middleware token:",token);
        if (!token){
            return res.status(401).json({
                success:false,
                message:"user not Authenticated",
            });
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        
        req.user = user;
        next();
        
    }catch(error){
        console.log("error in auth middleware:",error);
        return res.status(401).json({
            success:false,
            message:"user not authenticated"
        });
    }
}


export const isadmin = (...role)=>{
    return (req,res,next)=>{
        if (!role.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:(`Role ${req.user.role} is not allowed to access this resource`)
            })
        }
        next();
    }
}
