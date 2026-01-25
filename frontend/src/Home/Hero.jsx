import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

function Hero() {
  const {blogs} = useAuth();
  console.log(blogs);
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => (
          <Link to={`/`} key ={element._id} className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div>
              <img src={element.blogImage.url} alt="" className="w-full h-56 object-cover" />
            </div>
            <div>
              <h1>{element.title}</h1>
            </div>
            <div>
              <img src={element.adminPhoto} alt="" />
            </div>
            <p>{element.adminName}</p>
            <p>New</p>
          </Link>
        ))
      ) : (
        <div></div>
      )}
    </div>
  )
}       

export default Hero
