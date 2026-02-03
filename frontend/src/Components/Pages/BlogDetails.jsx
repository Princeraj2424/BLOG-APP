import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchblogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log('BlogDetails API response:', data);
        
        if (data && typeof data === 'object' && data.blog) {
          setblogs(data.blog);
        } else {
          setblogs(data);
        }
      } catch (err) {
        setError("Failed to load blog details. Please try again later.");
        setblogs(null);
      } finally {
        setLoading(false);
      }
    };
    fetchblogs();
  }, [id]);
  return (
    <div className="min-h-screen bg-sky-100 py-4">
      <div className="flex justify-center items-start min-h-[40vh]">
        {loading ? (
          <div className="text-base text-blue-600 animate-pulse">Loading blog details...</div>
        ) : error ? (
          <div className="text-red-500 text-base font-semibold bg-white/80 p-4 rounded-lg shadow">{error}</div>
        ) : blogs ? (
          <section className="w-full max-w-xl bg-white/95 rounded-xl shadow-lg p-4 border border-blue-100 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="text-blue-600 uppercase text-[10px] font-bold tracking-wider mb-1 md:mb-0">
                {blogs?.category || <span className="text-gray-300">No category</span>}
              </div>
              <div className="text-gray-400 text-[10px] italic">
                {blogs?.createdAt ? new Date(blogs.createdAt).toLocaleDateString() : <span className="text-gray-200">No date</span>}
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400 drop-shadow">
              {blogs?.title || <span className="text-gray-300">No Title</span>}
            </h1>
            <div className="flex items-center mb-3">
              <img
                src={blogs?.adminPhoto || 'https://ui-avatars.com/api/?name=Author'}
                alt="author_avatar"
                className="w-9 h-9 rounded-full mr-2 border border-blue-200 shadow object-cover bg-gray-100"
                onError={e => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Author'; }}
              />
              <div>
                <p className="text-sm font-semibold text-blue-700">{blogs?.adminName || 'Unknown Author'}</p>
                <p className="text-[10px] text-gray-500">Blog Author</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              {blogs?.blogImage?.url ? (
                <img
                  src={blogs.blogImage.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full aspect-video mb-3 rounded-lg shadow border-4 border-blue-400 object-cover bg-gray-100 outline outline-2 outline-indigo-500 max-h-[450px]"
                  style={{height: 'auto', maxWidth: '100%'}} 
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                />
              ) : (
                <div className="md:w-1/2 w-full aspect-video mb-3 rounded-lg shadow border-4 border-blue-400 outline outline-2 outline-indigo-500 flex items-center justify-center bg-gray-100 text-gray-400 text-base max-h-[450px]" style={{height: 'auto', maxWidth: '100%'}}>No Image</div>
              )}
              <div className="md:w-1/2 w-full md:pl-2 flex flex-col justify-center">
                <p className="text-xs mb-2 text-gray-700 leading-snug break-words">
                  {blogs?.about || <span className="text-gray-300">No description available.</span>}
                </p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <span className="inline-block bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-sm">Premium</span>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-sm">Verified</span>
                </div>
              </div>
            </div>
            {/* Decorative divider */}
            <div className="my-2 flex justify-center">
              <span className="block w-12 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-60"></span>
            </div>
            {/* Add more premium features or related blogs here if needed */}
          </section>
        ) : null}
      </div>
    </div>
  );
}
export default Detail;