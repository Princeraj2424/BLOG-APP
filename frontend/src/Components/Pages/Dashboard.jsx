import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import Sidebar from '../../dashboard/Sidebar';
import MyProfile from '../../dashboard/MyProfile';
import MyBlogs from '../../dashboard/MyBlogs';
import CreateBlogs from '../../dashboard/CreateBlogs';
import Updateblog from '../../dashboard/Updateblog';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className='flex h-screen'>
      <Sidebar component={component} setComponent={setComponent} />
      <div className='flex-1 overflow-y-auto bg-gray-50'>
        {component === "My Profile" && <MyProfile />}
        {component === "My Blogs" && <MyBlogs />}
        {component === "Create Blog" && <CreateBlogs />}
        {component === "Update Blog" && <Updateblog />}
      </div>
    </div>
  );
}

export default Dashboard;
