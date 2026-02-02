import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        const blog = data.blog || data;
        setTitle(blog?.title || "");
        setCategory(blog?.category || "");
        setAbout(blog?.about || "");
        setBlogImage(blog?.blogImage?.url || "");
      } catch (error) {
        console.log(error);
        toast.error("Please fill the required fields");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    formData.append("blogImage", blogImage);
    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-200 py-8 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-8 drop-shadow-lg">Update Blog</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Category</label>
            <select
              className="w-full p-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="History">History</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Blog Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Blog Image</label>
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : typeof blogImage === "string" && blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog Main"
                className="w-full h-56 object-cover rounded-xl shadow mb-2 border border-blue-100"
              />
              <input
                type="file"
                className="w-full p-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={changePhotoHandler}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">About</label>
            <textarea
              rows="6"
              className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
              placeholder="Write something about your blog (at least 200 characters!)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;