import express from "express";
import {createBlog, deleteBlog, getALLBlogs, getMyBlogs, getSingleBlogs, updateBlog } from "../controller/blog.controller.js";
import { isadmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();
router.post("/create", isAuthenticated,isadmin("admin"), createBlog);
router.delete("/delete/:id", isAuthenticated,isadmin("admin"), deleteBlog);
router.get("/all-blogs",isAuthenticated,getALLBlogs);
router.get("/single-blog/:id",isAuthenticated,getSingleBlogs);
router.get("/my-blogs",isAuthenticated,getMyBlogs);
router.put("/update/:id",isAuthenticated,isadmin("admin"),updateBlog);

export default router;