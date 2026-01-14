import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})



