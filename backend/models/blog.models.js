import mongoose from "mongoose";
import validator from"validator";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    blogImage:{
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
        minLength:[200,"Blog content musb be at least 200 characters Long"],

    },
    createdAt:{
        type:Date,
        default:Date.now,
    },  
    },
});
export const Blog = mongoose.model("Blog",blogSchema);