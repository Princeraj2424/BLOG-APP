import React from 'react'
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { Route, Routes, useLocation } from 'react-router-dom';
import Blogs from "./Components/Pages/Blogs";
import Contact from "./Components/Pages/Contact";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Dashboard from "./Components/Pages/Dashboard";
import Creator from "./Components/Pages/Creators";
import { useAuth } from './Context/AuthProvider';

const App = () => {
  const location = useLocation();
  const hideNavBarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  
  const { blogs } = useAuth();
  console.log(blogs);
  return (
    <div>
  {/*Define Routes*/}
      {!hideNavBarFooter && <Navbar/>}
      <Routes> 
      {/*<Route exact path="/" element={<Home/>}/>*/}
      <Route exact path="/blogs"element={<Blogs/>}/>
      <Route exact path="/contact"element={<Contact/>}/>
      <Route exact path="/creators"element={<Creator/>}/>
      <Route exact path="/login"element={<Login/>}/>
      <Route exact path="/register"element={<Register/>}/>
      <Route exact path="/dashboard"element={<Dashboard/>}/>

      </Routes>
      {/*{!hideNavBarFooter && <Footer/>}*/}
    </div>
  )
}

export default App
