import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/my-blogs", {
          withCredentials: true,
        });
        console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log("error fetching my blogs:", error);
      }
    };
    fetchMyBlogs();
  }, []);
  
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
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-blue-700 transition-transform duration-200 text-xs">View</button>
                    </div>
                    <div className="flex justify-between gap-2">
                      <button className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-yellow-700 transition-transform duration-200 text-xs">Update</button>
                      <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-red-700 transition-transform duration-200 text-xs">Delete</button>
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
