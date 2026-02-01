import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

function MyBlogs() {
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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-purple-100 pt-4 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10 drop-shadow-lg">My Blogs</h2>
        {blogsArray && blogsArray.length > 0 ? (
          <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {blogsArray.map((blog) => (
              <div key={blog._id} className="bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col items-center w-full max-w-xs mx-auto">
                <div className="relative h-40 w-full overflow-hidden flex items-center justify-center">
                  <img src={blog.blogImage?.url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
               
                </div>
                <div className="p-4 flex-1 flex flex-col w-full">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200 truncate">{blog.title}</h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">{blog.about}</p>
                  <div className="mt-auto flex flex-col gap-2">
                    <span className="text-xs text-gray-400 mb-2">
                      {blog.createdAt && !isNaN(Date.parse(blog.createdAt))
                        ? new Date(Date.parse(blog.createdAt)).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                        : 'Date not available'}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-yellow-700 transition-transform duration-200 text-xs w-1/2">Update</button>
                      <button onClick={() => handleDelete(blog._id)} className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-red-700 transition-transform duration-200 text-xs w-1/2">Delete</button>
                    </div>
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
