



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Apple Airpods Max",
    subtitle: "Wireless Over-Ear Headphones",
    price: "£499.99",
    image: "/assets/air7.png",
    first: "Pro-Level Active Noise Cancellation",
    second: "USB-C Charging",
    third: "Transparency mode lets you comfortably hear and interact with the world around you.",
  },
  {
    title: "Canon EOS R5 Mark",
    subtitle: "Mirrorless Camera",
    price: "£249.99",
    image:
      "https://www.jdinstitute.edu.in/media/2021/06/National-Camera-Day-Various-types-of-cameras-for-photography-2.jpg",
    first: "Up to 30 fps continuous shooting with AF/AE tracking",
    second: "Eye Control AF + New Vehicle Priority AF",
    third: "6K RAW recording + 4K movie with 6K oversampling",
  },
  {
    title: "Titan Heritage Premium Smartwatch",
    subtitle: "Diamonds and Black Dial Analog Watch",
    price: "£59.99",
    image:
      "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdbbe49f7/images/Titan/Catalog/90207KM01_1.jpg?sw=600&sh=600",
    first: "BT Calling, Advanced Chipset",
    second: "Glass : Toughened Glass",
    third: "alarm, stopwatch, timer, weather display, and adjustable sound and vibration settings",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 w-full overflow-hidden">
      {/* Slide Wrapper */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 flex justify-center items-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center max-w-6xl w-full">
              {/* Left Text Content */}
              <div className="md:w-1/2 w-full space-y-4 sm:space-y-6 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-600">
                  {slide.title}
                </h1>
                <h2 className="text-lg sm:text-xl text-gray-700">
                  {slide.subtitle}
                </h2>

                <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>{slide.first}</li>
                  <li>{slide.second}</li>
                  <li>{slide.third}</li>
                </ul>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-4 sm:mt-6 space-y-3 sm:space-y-0">
                  <span className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    {slide.price}
                  </span>
                  <Link
                    to="/product"
                    className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Buy
                  </Link>
                </div>
              </div>

              {/* Right Product Image */}
              <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-64 sm:w-72 md:w-80 lg:w-[22rem] rounded shadow-lg object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const slides = [
//   {
//     title: "Apple Airpods Max",
//     subtitle: "Wireless Over-Ear Headphones",
//     price: "£499.99",
//     image: "/assets/air7.png",
//     first: "Pro-Level Active Noise Cancellation",
//     second: "USB-C Charging",
//     third: "Transparency mode lets you comfortably hear and interact with the world around you.",
//   },
//   {
//     title: "Canon EOS R5 Mark",
//     subtitle: "Mirrorless Camera",
//     price: "£249.99",
//     image:
//       "https://www.jdinstitute.edu.in/media/2021/06/National-Camera-Day-Various-types-of-cameras-for-photography-2.jpg",
//     first: "Up to 30 fps continuous shooting with AF/AE tracking",
//     second: "Eye Control AF + New Vehicle Priority AF",
//     third: "6K RAW recording + 4K movie with 6K oversampling",
//   },
//   {
//     title: "Titan Heritage Premium Smartwatch",
//     subtitle: "Diamonds and Black Dial Analog Watch",
//     price: "£59.99",
//     image:
//       "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdbbe49f7/images/Titan/Catalog/90207KM01_1.jpg?sw=600&sh=600",
//     first: "BT Calling, Advanced Chipset",
//     second: "Glass : Toughened Glass",
//     third: "alarm, stopwatch, timer, weather display, and adjustable sound and vibration settings",
//   },
// ];

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 5000); // slower for readability

//     return () => clearInterval(interval);
//   }, []);

//   // Animation variants
//   const slideVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.95 },
//     visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
//   };

//   const listItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 w-full overflow-hidden">
//       {/* Slide Wrapper */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out w-full"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`,
//           width: `${slides.length * 100}%`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className="w-full flex-shrink-0 flex justify-center items-center"
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center max-w-6xl w-full"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.5 }}
//               variants={slideVariants}
//             >
//               {/* Left Text Content */}
//               <motion.div
//                 className="md:w-1/2 w-full space-y-4 sm:space-y-6 text-center md:text-left"
//                 variants={textVariants}
//               >
//                 <motion.h1
//                   className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-600"
//                   variants={textVariants}
//                 >
//                   {slide.title}
//                 </motion.h1>
//                 <motion.h2
//                   className="text-lg sm:text-xl text-gray-700"
//                   variants={textVariants}
//                 >
//                   {slide.subtitle}
//                 </motion.h2>

//                 <motion.ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
//                   <motion.li variants={listItemVariants}>{slide.first}</motion.li>
//                   <motion.li variants={listItemVariants}>{slide.second}</motion.li>
//                   <motion.li variants={listItemVariants}>{slide.third}</motion.li>
//                 </motion.ul>

//                 <motion.div
//                   className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-4 sm:mt-6 space-y-3 sm:space-y-0"
//                   variants={textVariants}
//                 >
//                   <span className="text-2xl sm:text-3xl font-semibold text-gray-800">
//                     {slide.price}
//                   </span>
//                   <Link
//                     to="/product"
//                     className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
//                   >
//                     Buy
//                   </Link>
//                 </motion.div>
//               </motion.div>

//               {/* Right Product Image */}
//               <motion.div
//                 className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//               >
//                 <img
//                   src={slide.image}
//                   alt={slide.title}
//                   className="w-64 sm:w-72 md:w-80 lg:w-[22rem] rounded shadow-lg object-contain"
//                 />
//               </motion.div>
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;

