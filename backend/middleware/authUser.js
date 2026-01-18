import models from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res)=>{
    try{
        const token = req.cookies.jwt;

    }
}