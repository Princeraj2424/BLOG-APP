import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaPenNib } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

function Footer() {
  
  return (
    <footer className="bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-6">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Brand Section */}
          <div>
            <div className="mb-3">
              <Link to="/" className="inline-block group">
                <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Titli&nbsp;<span className="text-blue-500">Blog</span>
        </div>
              
                <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">Your Creative Space</p>
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover inspiring stories and creative content from talented writers. 
              Share your voice and connect with readers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Blogs
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Creators
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm cursor-pointer inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Technology
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm cursor-pointer inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Lifestyle
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm cursor-pointer inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Travel
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm cursor-pointer inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Devotional
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all duration-200 text-sm cursor-pointer inline-flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Business
                </span>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p className="text-gray-400 text-sm mb-4">Follow us on social media</p>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
            <a 
              href="mailto:nicksingh914@gmail.com" 
              className="flex items-center text-gray-400 hover:text-green-500 transition-all duration-200 text-sm group"
            >
              <MdEmail className="mr-2 group-hover:scale-110 transition-transform" size={18} />
              nicksingh914@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} <span className="text-blue-500 font-semibold">TitliBlog</span>. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-400 hover:text-green-500 hover:underline transition-all duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-green-500 hover:underline transition-all duration-200 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
