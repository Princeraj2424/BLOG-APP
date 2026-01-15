import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);

//middleware
app.use(express.json());
//connect DB
try{
    await mongoose.connect(MONGODB_URL);
    console.log("connected to MongoDB");
}catch(error){
    console.log("error connecting to MongoDB",error);
}

//define routes
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})



