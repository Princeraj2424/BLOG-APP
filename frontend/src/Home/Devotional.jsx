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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <Link to={`/`} key={element._id} 
              className="group bg-white rounded-lg shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100">
              <div className='relative overflow-hidden'>
                <img src={element.blogImage.url} alt={element.title} 
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>
                <h3 className='absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white text-sm sm:text-base font-bold line-clamp-2 group-hover:text-purple-200 transition-colors'>
                  {element.title}
                </h3>
              </div>
  
              <div className='p-3 sm:p-4'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <img src={element.adminPhoto} alt={element.adminName} 
                    className='w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-purple-100' />
                  <div className='flex-1'>
                    <p className='text-xs sm:text-sm font-semibold text-gray-800'>{element.adminName}</p>
                    <p className='text-xs text-gray-500'>Author</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No devotional blogs available
          </div>
        )}
      </div>
    </div>
  )
}

export default Devotional
