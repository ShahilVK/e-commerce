
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Product from './Product';
import Hero from './Hero';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

     
      <Navbar />
      <Hero />

    
      





{/* 
    <Link to="/product" className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
  Shop Now
</Link> */}


<div className="relative w-full h-[80vh] overflow-hidden bg-center bg-white bg-no-repeat transition-all duration-1100 ease-in-out"
 style={{backgroundImage: `url('/assets/outwatch.jpg')`}} >

</div>




    </div>
  );
}

export default Home;

