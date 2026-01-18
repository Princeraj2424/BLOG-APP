import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import blogRoutes from "./routes/blog.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

//connect DB
try{
    await mongoose.connect(MONGODB_URL);
    console.log("connected to MongoDB");
}catch(error){
    console.log("error connecting to MongoDB",error);

}
//Cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET

})


//define routes
app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})



