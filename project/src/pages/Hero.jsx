

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

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
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 w-full overflow-hidden">
//       {/* Slide Wrapper */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
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
//             <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center max-w-6xl w-full">
//               {/* Left Text Content */}
//               <div className="md:w-1/2 w-full space-y-4 sm:space-y-6 text-center md:text-left">
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-600">
//                   {slide.title}
//                 </h1>
//                 <h2 className="text-lg sm:text-xl text-gray-700">
//                   {slide.subtitle}
//                 </h2>

//                 <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
//                   <li>{slide.first}</li>
//                   <li>{slide.second}</li>
//                   <li>{slide.third}</li>
//                 </ul>

//                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-4 sm:mt-6 space-y-3 sm:space-y-0">
//                   <span className="text-2xl sm:text-3xl font-semibold text-gray-800">
//                     {slide.price}
//                   </span>
//                   <Link
//                     to="/product"
//                     className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
//                   >
//                     Buy
//                   </Link>
//                 </div>
//               </div>

//               {/* Right Product Image */}
//               <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center">
//                 <img
//                   src={slide.image}
//                   alt={slide.title}
//                   className="w-64 sm:w-72 md:w-80 lg:w-[22rem] rounded shadow-lg object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;








import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Apple Airpods Max",
    subtitle: "Wireless Over-Ear Headphones",
    price: "£499.99",
    image: "/assets/air7.png",
    features: [
      "Pro-Level Active Noise Cancellation",
      "USB-C Charging",
      "Transparency mode for real-world awareness",
    ],
  },
  {
    title: "Canon EOS R5 Mark",
    subtitle: "Mirrorless Camera",
    price: "£249.99",
    image:
      "https://www.jdinstitute.edu.in/media/2021/06/National-Camera-Day-Various-types-of-cameras-for-photography-2.jpg",
    features: [
      "30 fps continuous shooting with AF/AE tracking",
      "Eye Control AF + Vehicle Priority AF",
      "6K RAW recording + 4K movie oversampling",
    ],
  },
  {
    title: "Titan Heritage Premium Smartwatch",
    subtitle: "Luxury Analog & Smart Features",
    price: "£59.99",
    image:
      "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdbbe49f7/images/Titan/Catalog/90207KM01_1.jpg?sw=600&sh=600",
    features: [
      "BT Calling, Advanced Chipset",
      "Toughened Glass Protection",
      "Alarm, Stopwatch, Weather Display",
    ],
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-slide every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10" />

      <div className="max-w-7xl w-full px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* LEFT TEXT SECTION */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {slides[current].title}
              </h1>
              <h2 className="text-lg md:text-2xl text-yellow-400 font-semibold">
                {slides[current].subtitle}
              </h2>

              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                {slides[current].features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              <div className="flex items-center gap-6 pt-4">
                <span className="text-3xl font-bold text-yellow-400">
                  {slides[current].price}
                </span>
                <Link
                  to="/product"
                  className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex-1 flex justify-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[current].image}
              src={slides[current].image}
              alt={slides[current].title}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.8 }}
              className="w-[18rem] md:w-[26rem] lg:w-[30rem] object-contain drop-shadow-2xl"
            />
          </AnimatePresence>
          {/* Floating Effect */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* DOTS INDICATOR */}
      <div className="absolute bottom-6 flex space-x-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-yellow-400 scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
