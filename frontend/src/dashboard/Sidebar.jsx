import React from 'react'
import { useAuth } from '../Context/AuthProvider';
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { FaBlog, FaEdit, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Sidebar({ component, setComponent }){
const { profile, setIsAuthenticated, blogs } = useAuth();
const navigate = useNavigate();
const [userBlogCount, setUserBlogCount] = React.useState(0);
React.useEffect(() => {
    const fetchUserBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:4001/api/blogs/my-blogs", { withCredentials: true });
            if (Array.isArray(response.data.myBlogs)) {
                setUserBlogCount(response.data.myBlogs.length);
            } else {
                setUserBlogCount(0);
            }
        } catch (error) {
            setUserBlogCount(0);
        }
    };
    fetchUserBlogs();
}, []);

 const handleLogout = async () => {
     try {
         await axios.get("http://localhost:4001/api/users/logout", { withCredentials: true });
         setIsAuthenticated(false);
         toast.success("You are logged out.");
         setTimeout(() => {
             navigate("/login");
         }, 800); 
     } catch (error) {
         toast.error("Logout failed");
     }
 };

 const menuItems = [
   { name: "My Blogs", icon: FaBlog },
   { name: "Create Blog", icon: FaEdit },
   { name: "My Profile", icon: CgProfile },
 ];

    return (
        <div className='h-screen w-64 bg-linear-to-b from-gray-900 via-slate-900 to-gray-90 border-r border-gray-800 flex flex-col shadow-2xl relative overflow-hidden'>
            {/*  Background of sidebar*/}
                <div className='absolute inset-0 opacity-5 bg-sky-400'>
                <div className='absolute inset-0' style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }}></div>
            </div>

            {/* Profile Section */}
            <div className='relative p-6 border-b border-gray-800/50'>
                <div className='flex flex-col items-center space-y-3'>
                    <div className='relative group'>
                        <div className='w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300 cursor-pointer'>
                            <img
                                src={profile?.photo?.url || 'https://via.placeholder.com/150'}
                                alt={profile?.name}
                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                            />
                        </div>
                        <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse shadow-lg shadow-green-500/50'></div>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-base font-semibold text-white tracking-tight'>{profile?.name || 'User'}</h3>
                        <p className='text-xs text-gray-400 capitalize mt-0.5'>{profile?.role || 'Member'}</p>
                    </div>
                    <div className='px-4 py-1.5 bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm'>
                        <span className='text-xs text-blue-400 font-semibold'>{userBlogCount} Posts Published</span>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className='relative flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent'>
                <div className='mb-4'>
                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider px-4'>Navigation</p>
                    <div className='h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mt-2'></div>
                </div>

                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = component === item.name;
                    return (
                        <button
                            key={item.name}
                            onClick={() => setComponent(item.name)}
                            style={{ animationDelay: `${index * 50}ms` }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform relative overflow-hidden group ${
                                isActive
                                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800/70 hover:translate-x-1'
                            }`}
                        >
                            {!isActive && (
                                <>
                                    <div className='absolute inset-0 bg-linear-to-r from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-blue-600/10 transition-all duration-500'></div>
                                    <div className='absolute inset-0 border border-transparent group-hover:border-gray-700/50 rounded-xl transition-all duration-300'></div>
                                </>
                            )}
                            {isActive && (
                                <>
                                    <div className='absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-lg shadow-white/50'></div>
                                    <div className='absolute inset-0 bg-white/5 animate-pulse'></div>
                                </>
                            )}
                            <Icon className={`text-lg transition-all duration-300 relative z-10 ${
                                isActive ? 'text-white drop-shadow-lg' : 'text-gray-400 group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-3'
                            }`} />
                            <span className={`font-medium text-sm relative z-10 ${isActive && item.name === 'My Blogs' ? 'text-black' : ''}`}>{item.name}</span>
                            {isActive && (
                                <div className='ml-auto relative z-10 flex items-center gap-1'>
                                    <div className='w-1.5 h-1.5 bg-white rounded-full animate-ping'></div>
                                    <div className='w-1.5 h-1.5 bg-white rounded-full'></div>
                                </div>
                            )}
                        </button>
                    );
                })}

                <div className='pt-4'>
                    <div className='h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-4'></div>
                    <button
                        onClick={() => navigate('/')}
                        className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/70 hover:translate-x-1 transition-all duration-300 transform group relative overflow-hidden'
                    >
                        <div className='absolute inset-0 bg-linear-to-r from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-blue-600/10 transition-all duration-500'></div>
                        <FaHome className='text-lg text-gray-400 group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10' />
                        <span className='font-medium text-sm relative z-10'>Back to Home</span>
                    </button>
                </div>
            </nav>

            {/* Logout Button */}
            <div className='relative p-4 border-t border-gray-800/50 backdrop-blur-sm'>
                <button
                    onClick={handleLogout}
                    className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 font-semibold text-sm shadow-lg shadow-red-900/30 hover:shadow-red-500/50 hover:shadow-xl transform hover:scale-[1.02] active:scale-95 group relative overflow-hidden'
                >
                    <div className='absolute inset-0 bg-linear-to-t from-white/0 to-white/0 group-hover:from-white/0 group-hover:to-white/10 transition-all duration-300'></div>
                    <MdLogout className='text-lg relative z-10 group-hover:rotate-12 transition-transform duration-300' />
                    <span className='relative z-10'>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar