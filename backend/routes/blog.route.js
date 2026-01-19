import express from "express";
import {createBlog, deleteBlog } from "../controller/blog.controller.js";
import { isadmin, isAuthenticated } from "../middleware/authUser.js";



const router= express.Router();
router.post("/create", isAuthenticated,isadmin("admin"), createBlog);
router.delete("/delete/:id", isAuthenticated,isadmin("admin"), deleteBlog);

export default router;