
import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider'

const Login = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useAuth();

  //handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role){
      toast.error("Please fill all the required fields");
      return;
    }
    
    try{
      const {data} = await axios.post("http://localhost:4001/api/users/login", {
        email,
        password,
        role
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(data);
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      
      // Update auth context
      setIsAuthenticated(true);
      setProfile(data.data);
      
      toast.success(data.message || "Login successful!");
      setEmail("");
      setPassword("");
      setRole("");
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    }catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.")
    }
  };

  return (
    <div>
    <Toaster />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Titli<span className="text-blue-500">Blog</span>
          </h2>
          <p className="mt-2 text-gray-600 text-sm">Welcome back! Please login to continue</p>
        </div>
        <form onSubmit={handleLogin}>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-md">
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className='mb-4'>
          <input type="email"
          placeholder='Your Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='w-full p-2 border rounded-md'
          />
        </div>
        <div className='mb-4'>
          <input type="password"
          placeholder='Your Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className='w-full p-2 border rounded-md'
           />
        </div>
        <p className='text-center mb-4'>
         New User?{" "}
          <Link to="/register" className="text-blue-600 ">Register Now</Link>
        </p>

        <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration -300 rounded-md text-white'>Login</button>
        </div>
        </form>
      </div>
      </div>
    </div>
  )
}


export default Login
