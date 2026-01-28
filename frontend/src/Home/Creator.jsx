import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Creator() {
  const[admin,setAdmin]=useState([])
  useEffect(()=>{
    const fetchAdmins=async()=>{
      try {
        const {data}=await axios.get("http://localhost:4001/api/users/admins",{
          withCredentials:true
        });
        console.log("API Response:", data);
        setAdmin(data.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    }
    fetchAdmins();
  }, [])
  return (
    <div className="container mx-auto my-10 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-green-600 pl-4">
        Popular Creators
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((creator) => (
            <div 
              key={creator._id} 
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-green-500 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:scale-110">
                  <img 
                    src={creator.photo.url} 
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <h3 className="text-center text-sm sm:text-base font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors px-2">
                {creator.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 capitalize">{creator.role}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No creators available
          </div>
        )}
      </div>
    </div>
  )
}

export default Creator
