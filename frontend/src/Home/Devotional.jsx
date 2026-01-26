import React from 'react'
import { useAuth } from '../Context/AuthProvider.jsx';
import { Link } from 'react-router-dom';

function Devotional() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-10 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-purple-600 pl-4">
        Devotional
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <Link to={`/`} key={element._id} 
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              <div className='relative'>
                <img src={element.blogImage.url} alt={element.title} 
                  className="w-full h-56 object-cover" />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent'></div>
                <h1 className='absolute bottom-4 left-4 right-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300'>
                  {element.title}
                </h1>    
              </div>
  
              <div className='p-4 flex items-center gap-3'>
                <img src={element.adminPhoto} alt={element.adminName} 
                  className='w-12 h-12 rounded-full object-cover border-2 border-yellow-400' />
                <div>
                  <p className='text-sm font-semibold text-gray-800'>{element.adminName}</p>
                  <p className='text-xs text-gray-500'>New</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No devotional blogs available
          </div>
        )}
      </div>
    </div>
  )
}

export default Devotional
