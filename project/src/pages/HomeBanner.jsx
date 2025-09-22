






// // HomeBannerPro.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomeBanner = () => {
//   return (
//     <div className="w-full bg-white flex justify-center">
//       <div className="max-w-7xl w-full mt-20 px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        
//         {/* Left side - Text */}
//         <div className="md:w-1/2 text-center md:text-left">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
//             Elevate Your <span className="text-red-600">Tech Experience</span>
//           </h1>
//           <p className="text-gray-700 text-lg md:text-xl mb-10">
//             Discover premium gadgets, accessories, and electronics that make life smarter and easier. Shop quality products with confidence.
//           </p>

//           <Link
//             to="/products"
//             className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-5 rounded-lg shadow-lg transition duration-300 text-lg"
//           >
//             Shop Now
//           </Link>
//         </div>

//         {/* Right side - Image / Illustration */}
//         <div className="md:w-1/2 flex justify-center">
//           <img
//             src="/assets/hero.jpg"
//             alt="Tech Accessories"
//             className="w-full max-w-lg rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
//           />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default HomeBanner;






// HomeBannerWithBg.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomeBannerWithBg = () => {
  return (
     <div className="w-full relative h-[95vh] md:h-screen ">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('../assets/big1.jpg')",
   
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Content */}
      <div className="relative max-w-7xl w-full mx-auto mt-20 px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        {/* Left side - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-950 mb-6 leading-tight">
            Elevate Your <span className="text-red-600">Tech Experience</span>
          </h1>
          <p className="text-amber-200 text-lg md:text-xl mb-10">
            Discover premium gadgets, accessories, and electronics that make life smarter and easier. Shop quality products with confidence.
          </p>

          <Link
            to="/products"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-5 rounded-lg shadow-lg transition duration-300 text-lg"
          >
            Shop Now
          </Link>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center">
          {/* <img
            src=""
            // alt="Tech Accessories"
            className="w-full max-w-lg rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HomeBannerWithBg;
