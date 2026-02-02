import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function MyBlogs() {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  // Fetch blogs
  const fetchMyBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/blogs/my-blogs", {
        withCredentials: true,
      });
      setMyBlogs(data);
    } catch (error) {
      console.log("error fetching my blogs:", error);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:4001/api/blogs/delete/${id}`, {
        withCredentials: true,
      });
      toast.success('Blog deleted successfully');
      fetchMyBlogs();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to delete blog'
      );
    }
  };

  let blogsArray = [];
  if (Array.isArray(myBlogs)) {
    blogsArray = myBlogs;
  } else if (myBlogs && Array.isArray(myBlogs.myBlogs)) {
    blogsArray = myBlogs.myBlogs;
  }

  return (
    <div className="min-h-screen bg-sky-200 pt-4 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-black mb-10 drop-shadow-lg">My Blogs</h2>
        {blogsArray && blogsArray.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {blogsArray.map((blog) => (
                <div key={blog._id} className="bg-white rounded-2xl shadow-lg border-4 border-black hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col">
                  <div className="h-32 w-full overflow-hidden flex items-center justify-center rounded-t-2xl bg-sky-100">
                    <img src={blog.blogImage?.url} alt={blog.title} className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300 shadow" />
                  </div>
                  <div className="flex-1 flex flex-col justify-end w-full px-4 pb-4 pt-2">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 truncate tracking-tight">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2 font-medium">{blog.about}</p>
                  <span className="text-xs text-blue-400 mb-2 font-semibold">
                    {blog.createdAt && !isNaN(Date.parse(blog.createdAt))
                      ? new Date(Date.parse(blog.createdAt)).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                      : 'Date not available'}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-bold shadow hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 transition-transform duration-200 text-xs w-1/2"
                      onClick={() => navigate(`/blogs/update/${blog._id}`)}
                    >
                      Update
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-bold shadow hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-transform duration-200 text-xs w-1/2">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MyBlogs
