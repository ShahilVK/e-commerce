
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

     
      <Navbar />

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
       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-6xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
        
        {/* Left Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-yellow-600">Beats</h1>
          <h2 className="text-xl text-gray-700">Studio Wireless in Khaki</h2>

          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Up to 12 hours of battery life for all-day listening</li>
            <li>Block out the real world with dual-mode Adaptive Noise Cancelling</li>
            <li>No matter where you escape to, stay wireless with Bluetooth® technology</li>
          </ul>

          <div className="flex items-center space-x-6">
            <span className="text-3xl font-semibold text-gray-800">£499.99</span>
            <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-500">
              Buy
            </button>
          </div>
        </div>

        {/* Right Product Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="https://www.designinfo.in/wp-content/uploads/2024/04/Apple-AirPods-Max-Pink-1-485x485-optimized.webp"
            alt="Beats Studio Wireless Khaki"
            className="w-full max-w-sm rounded shadow-lg"
          />
        </div>
      </div>
    </div>

    </div>
  );
}

export default Home;

