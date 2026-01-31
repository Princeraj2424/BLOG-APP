
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function CreateBlogs() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title || !category || !about || !blogImage) {
      toast.error("Please fill all the required fields and upload an image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast.success(data.message || "Blog created successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage(null);
      setBlogImagePreview("");
    } catch (error) {
      console.log("error creating blog:", error);
      toast.error(error.response?.data?.message || "Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-200 py-8 px-4">
      <Toaster />
      <form onSubmit={handleCreateBlog} className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center bg-linear-to-r bg-black to-purple-600 bg-clip-text text-transparent mb-4">Create New Blog</h2>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter blog category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">About</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-30"
            placeholder="Write your blog content here..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
            onChange={handleImageChange}
          />
          {blogImagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={blogImagePreview}
                alt="Blog Preview"
                className="h-40 w-40 object-cover rounded-xl border-2 border-blue-200 shadow-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] transition-transform ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
}

export default CreateBlogs;
