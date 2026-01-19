import { Blog } from "../models/blog.models.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async(req,res)=>{
    try{
         
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                success:false,
                message:"Blog image is required"
            });
        }

        const {blogImage} =req.files;
        const allowedFormats = ["image/jpeg","image/png","image/jpg","image/HEIC"];
        if(!allowedFormats.includes(blogImage.mimetype)){
            return res.status(400).json({
                success:false,
                message:"invalid image format. Please upload jpg, jpeg or png"
            });
        }

        const {title, about, category} = req.body;
        if(!title || !about || !category){
            return res.status(400).json({
                success:false,
                message:"Please provide title, about and category"
            });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo;
        const createdBy = req?.user?._id;

        //upload image to cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );

        if(!cloudinaryResponse || cloudinaryResponse.error){
            return res.status(500).json({
                success:false,
                message:"Error uploading image to cloudinary"
            });
        }

        const blogData ={
            title,
            category,
            about,
            adminName,
            adminPhoto,
            createdBy,
            blogImage:{
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url,
            }
        };

        const blog = await Blog.create(blogData);

        res.status(201).json({
            success:true,
            message:"Blog created successfully",
            blog
        });

    }catch(error){
        console.log("error creating blog",error);
        res.status(500).json({
            success:false,
            message:"Error creating blog",
            error:error.message,
        });
    }
}

export const deleteBlog = async(req,res)=>{
    
}
    

