import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  // Get user and blogs data from context
  const { user, blogs } = useAuth();
  console.log(blogs);
  
  // State to show/hide mobile menu
  const [show, setShow] = useState(false);
  
  return (
    <nav className="shadow-lg px-4 py-3 ">
      <div className="flex justify-between items-center container mx-auto">
        
        {/* Logo  */}
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Titli<span className="text-blue-500">Blog</span>
        </div>
        
        {/* Desktop Menu Links*/}
        <ul className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-500">
            HOME
          </Link>
          <Link to="/blogs" className="hover:text-blue-500">
            BLOGS
          </Link>
          <Link to="/creators" className="hover:text-blue-500">
            CREATORS
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            CONTACT
          </Link>
        </ul>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-2">
          <Link 
            to="/dashboard" 
            className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md"
          >
            DASHBOARD
          </Link>
          <Link 
            to="/login"
            className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md"
          >
            LOGIN
          </Link>
        </div>
        
        {/* Mobile menu Shows only on small screens */}
        <div className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </div>
        
      </div>
      
      {/* Mobile Menu - Full Screen */}
      {show && (
        <div className="bg-white">
          <ul className="flex flex-col h-screen items-center justify-center space-y-3">
            <Link 
              to="/" 
              onClick={() => setShow(false)} 
              className="hover:text-blue-500 text-xl"
            >
              HOME
            </Link>
            <Link 
              to="/blogs" 
              onClick={() => setShow(false)} 
              className="hover:text-blue-500 text-xl"
            >
              BLOGS
            </Link>
            <Link 
              to="/creators" 
              onClick={() => setShow(false)} 
              className="hover:text-blue-500 text-xl"
            >
              CREATORS
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setShow(false)} 
              className="hover:text-blue-500 text-xl"
            >
              CONTACT
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setShow(false)} 
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md"
            >
              DASHBOARD
            </Link>
            <Link 
              to="/login" 
              onClick={() => setShow(false)} 
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md"
            >
              LOGIN
            </Link>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
