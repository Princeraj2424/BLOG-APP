import React from 'react'
import Navbar from "../src/Components/Navbar";
import Home from "../src/Components/Home";
import Footer from "../src/Components/Footer"

const App = () => {
  return (
    <div>
  {/*Define Routes*/}
  
      <Navbar/>
      <Routes>
      <Routes exact path="/"element={<Home/>}/>
      </Routes>
 
      <Home/>
      <Footer/>
    </div>
  )
}

export default App
