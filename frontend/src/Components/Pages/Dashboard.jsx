import React from 'react'
import { useAuth } from '../../Context/AuthProvider';
import Sidebar from '../../dashboard/Sidebar';

function Dashboard(){
  const{profile,isAuthenticated}=useAuth();
  console.log(profile, isAuthenticated);
  return (
  <div>
    <div><Sidebar/></div>
  </div>
  )
}

export default Dashboard
