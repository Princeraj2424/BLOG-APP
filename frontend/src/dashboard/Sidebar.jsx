import React from 'react'
import { useAuth } from '../Context/AuthProvider';


function Sidebar(){
 const {profile, isAuthenticated}=useAuth();   
 console.log('Sidebar Profile:', profile);
 console.log('Is Authenticated:', isAuthenticated);
  return (
    <div>
      
    </div>
  )
}

export default Sidebar