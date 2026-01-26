import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthProvider';

const Register = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[password,setPassword]=useState("");
  const [role, setRole] = useState("");
  const[education,SetEducation]=useState("");
  const[photo,setPhoto]=useState("");
  const[photoPreview,setPhotoPreview]=useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useAuth();

//handle photo change when user signup
const changePhotoHandler=(e)=>{
  console.log(e);
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload=()=>{
    setPhotoPreview(reader.result);
    setPhoto(file);
  };

};

//handle register form submit
const handleRegister = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email",email);
  formData.append("phone",phone);
  formData.append("password",password);
  formData.append("role",role);
  formData.append("education", education);
  formData.append("photo",photo);

  try{
    const {data} = await axios.post("http://localhost:4001/api/users/register",formData, {
      headers:{
        "Content-Type":"multipart/form-data",
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
    
    toast.success(data.message || "User Registered Successfully");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
    SetEducation("");
    setPhoto("");
    setPhotoPreview("");
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);


  }catch(error){
    console.log(error);
    toast.error(error.message || "Please fill the required fields")
  }
};


  return (
    <>
    <Toaster />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Titli<span className="text-blue-500">Blog</span>
          </h2>
          <p className="mt-2 text-gray-600 text-sm">Create your account and start blogging</p>
        </div>
        <form onSubmit={handleRegister}>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-md">
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="mb-4">
          <input type="text"
          placeholder='your Name'
          className='w-full p-2 border rounded-md'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <input type="text"
          placeholder='Your Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='w-full p-2 border rounded-md'
          />
        </div>
        <div className='mb-4'>
          <input type="number" 
          placeholder='Your Number'
          className='w-full p-2 border rounded-md'
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
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
         <select value={education} onChange={(e) => SetEducation(e.target.value)} className="w-full p-2 mb-4 border rounded-md">
          <option value="">Select your Education</option>
          <option value="btech">B.Tech</option>
          <option value="mca">MCA</option>
          <option value="bca">BCA</option>
          <option value="mba">MBA</option>

        </select>
        <div className='flex icons-center mb-4'>
          <div className='photo w-20 h-20 mr-4'>
            {photoPreview && <img src={photoPreview} alt="photo" />}
          </div>
          <input type="file" onChange={changePhotoHandler}
          className='w-full p-2 border rounded-md'
          />
        </div>
        <p className='text-center mb-4'>
          Already Registerd?{" "}
          <Link to="/login" className="text-blue-600 ">Login Now</Link>
        </p>

        <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration -300 rounded-md text-white'>Register</button>
        </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Register
