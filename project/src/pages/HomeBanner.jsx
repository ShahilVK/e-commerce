
import React from 'react';
import { Link } from 'react-router-dom';

const HomeBannerWithBg = () => {
  return (
    <div className="relative w-full h-screen md:h-[95vh] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('../assets/big1.jpg')",
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl w-full mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-10 md:gap-20">
        {/* Left side - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Elevate Your <span className="text-red-500">Tech Experience</span>
          </h1>
          <p className="text-amber-100 text-base sm:text-lg md:text-xl mb-8">
            Discover premium gadgets, accessories, and electronics that make life smarter and easier. Shop quality products with confidence.
          </p>

          <Link
            to="/product"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-lg shadow-lg transition duration-300 text-base sm:text-lg"
          >
            Shop Now
          </Link>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center">
          {/* <img
            src="../assets/banner-product.png"
            alt="Tech Accessories"
            className="w-3/4 sm:w-2/3 md:w-full max-w-lg rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HomeBannerWithBg;
