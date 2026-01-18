import mongoose from "mongoose";

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
    },
    about:{
        type:String,
        required:true,
        minLength:[200,"Blog content must be at least 200 characters Long"],
    },
    category:{
        type:String,
        //required:true,
    },
    adminName:{
        type:String,
        //required:true,
    },
    adminPhoto:{
        type:String,
        //required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        //required:true,
    },
});
export const Blog = mongoose.model("Blog",blogSchema);