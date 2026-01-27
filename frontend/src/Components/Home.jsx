import React from 'react'
import Hero from '../Home/Hero.jsx'
import Trending from '../Home/Trending.jsx'
import Devotional from '../Home/Devotional.jsx'
import Creator from '../Home/Creator.jsx'

const Home = () => {
  return (
    <div className="bg-sky-100 min-h-screen">
      <Hero/>
    <Trending/>
    <Devotional/>
    <Creator/>
    </div>
  )
}

export default Home
