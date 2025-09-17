





import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Beats',
    subtitle: 'Studio Wireless in Khaki',
    price: '£499.99',
    image: '/assets/air7.png',
  },
  {
    title: 'AirPods Pro',
    subtitle: 'Active Noise Cancellation',
    price: '£249.99',
    image: 'https://www.jdinstitute.edu.in/media/2021/06/National-Camera-Day-Various-types-of-cameras-for-photography-2.jpg',
  },
  {
    title: 'Bluetooth Speaker',
    subtitle: 'Portable Powerful Sound',
    price: '£59.99',
    image: 'https://inspireonline.in/cdn/shop/files/Apple_Watch_Ultra_2_LTE_49mm_Titanium_Orange_Ocean_Band_PDP_Image_Avail_Position-1__en-IN_c9f55646-b834-40f1-9357-2e60613e80a7.jpg?v=1698876668&width=1445',
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 w-full overflow-hidden">
      
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${slides.length * 100}%` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 flex justify-center">
            
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center max-w-6xl w-full">
              {/* Left Text Content */}
              <div className="md:w-1/2 space-y-6 w-full">
                <h1 className="text-5xl font-bold text-yellow-600">{slide.title}</h1>
                <h2 className="text-xl text-gray-700">{slide.subtitle}</h2>

                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Up to 12 hours of battery life for all-day listening</li>
                  <li>Block out the real world with dual-mode Adaptive Noise Cancelling</li>
                  <li>No matter where you escape to, stay wireless with Bluetooth® technology</li>
                </ul>

                <div className="flex items-center space-x-6">
                  <span className="text-3xl font-semibold text-gray-800">{slide.price}</span>
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-500">
                    Buy
                  </button>
                </div>
              </div>

              {/* Right Product Image */}
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full max-w-sm rounded shadow-lg"
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




