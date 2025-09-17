
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

      {/* Hero Section */}
      {/* <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto my-12 px-6">
        
        <div className="text-center md:text-left space-y-6">
          <h2 className="text-xl font-semibold text-gray-600">Beats Solo</h2>
          <h1 className="text-5xl font-bold">Wireless <br /> HEADPHONES</h1>
          <p className="text-gray-500">Discover high-quality sound with wireless freedom. Best deals on AirPods & accessories.</p>
          
          <Link 
            to="/shop"
            className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
          >
            Shop By Category
          </Link>
        </div>

        <div className="mt-8 md:mt-0">
          <img 
            // src="https://www.telegraph.co.uk/content/dam/recommended/2025/04/25/TELEMMGLPICT000421491355_17455968833070_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=640" 
            alt="Wireless Headphones" 
            className="w-full max-w-md rounded shadow-lg"
          />
        </div>

      </div> */}
      






    <Link to="/product" className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
  Shop Now
</Link>




    </div>
  );
}

export default Home;

