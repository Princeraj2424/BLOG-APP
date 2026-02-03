import React from 'react'
import { useAuth } from '../Context/AuthProvider.jsx';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function Trending() {
  const { blogs } = useAuth();
  const responsive = {
  superLargeDesktop: {
    
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  return (
    <div className="container mx-auto my-10 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
        Trending Blogs
      </h2>
      <Carousel 
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="px-2"
      >
        {blogs && blogs.length > 0 ? (
          blogs.map((element) => (
            <Link to={`/blogs/blog/${element._id}`} key={element._id} className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group mx-2">
              <div className='relative'>
                <img src={element.blogImage.url} alt={element.title} 
                className="w-full h-56 object-cover" />
                <div className='absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent'></div>
                <h1 className='absolute bottom-4 left-4 right-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300'>
                  {element.title}
                </h1>    
              </div>
  
              <div className='p-4 flex items-center gap-3'>
                <img src={element.adminPhoto} alt={element.adminName} className='w-12 h-12 rounded-full object-cover border-2 border-yellow-400' />
                <div>
                  <p className='text-sm font-semibold text-gray-800'>{element.adminName}</p>
                  <p className='text-xs text-gray-500'>New</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500">No blogs available</div>
        )}
      </Carousel>
    </div>
  )
} 
export default Trending