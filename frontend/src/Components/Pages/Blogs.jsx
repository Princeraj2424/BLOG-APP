
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:4001/api/blogs/all-blogs');
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-sky-100 pt-4 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-black mb-10 drop-shadow-lg">All Blogs</h2>
        {blogs && blogs.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {blogs.map((blog) => (
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No blogs found.</div>
        )}
      </div>
    </div>
  );
}

export default Blogs
