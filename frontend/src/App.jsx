import React from 'react'
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { Route, Routes, useLocation } from 'react-router-dom';
import Blogs from "./Components/Pages/Blogs";
import Contact from "./Components/Pages/Contact";
import Login from "./Components/Pages/Login";
import About from "./Components/Pages/About";
import Register from "./Components/Pages/Register";
import Dashboard from "./Components/Pages/Dashboard";
import AdminRoute from "./Components/AdminRoute";
import Creator from "./Components/Pages/Creators";
import { useAuth } from './Context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Updateblog from './dashboard/Updateblog';

const App = () => {
  const location = useLocation();
  const hideNavBarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  
  const { blogs } = useAuth();
  return (
    <div>
  {/*Define Routes*/}
      {!hideNavBarFooter && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/creators" element={<Creator />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
        {/* routes for update blog */}
        <Route path="/blogs/update/:id" element={<Updateblog />} />
      </Routes>
      {/*toast container*/}
      <Toaster/>
      {!hideNavBarFooter && <Footer/>}
    </div>
  )
}

export default App
