// import React from 'react';

// // Example Product Data
// const products = [
//   { id: 1, name: 'Beats Studio Wireless', price: '£499.99', image: 'https://media.sweetwater.com/api/i/q-82__h-750__ha-d7b5f966f7d6857a__hmac-655dc2e3738091e2fa3c77139ba442c45aca32f5/images/closeup/750-BeatsStu2WBk_detail2.jpg' },
//   { id: 2, name: 'AirPods Pro', price: '£249.99', image: 'https://assets.mydeal.com.au/47684/airpods-max-usb-c-starlight-12787455_4.jpg?v=638657447625213530&im=Resize,width=600,height=600,aspect=fit,type=downsize;Crop,rect=(0,0,600,600),gravity=Center,allowExpansion' },
//   { id: 3, name: 'Wireless Earbuds', price: '£89.99', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/8/1/6825f5ff-e528-4b5a-85d9-72952babf307_LHSZ5CF0QK.png' },
//   { id: 4, name: 'Portable Bluetooth Speaker', price: '£59.99', image: 'https://via.placeholder.com/300x300?text=Bluetooth+Speaker' },
//   { id: 5, name: 'Portable Bluetooth Speaker', price: '£59.99', image: "/assets/speaker1.jpg" },
// ];

// function Product() {
//   return (
//     <div className="min-h-screen bg-grey-100 p-6">
//       <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-96 object-cover rounded"
//             />
            
//             <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
//             <p className="text-lg text-gray-700 mt-2">{product.price}</p>
            
//             <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Product;







// import React from 'react';

// // Example Product Data
// const products = [
//   { id: 1, name: 'Beats Studio Wireless', price: '£499.99', image: 'https://media.sweetwater.com/api/i/q-82__h-750__ha-d7b5f966f7d6857a__hmac-655dc2e3738091e2fa3c77139ba442c45aca32f5/images/closeup/750-BeatsStu2WBk_detail2.jpg' },
//   { id: 2, name: 'AirPods Pro', price: '£249.99', image: 'https://assets.mydeal.com.au/47684/airpods-max-usb-c-starlight-12787455_4.jpg?v=638657447625213530&im=Resize,width=600,height=600,aspect=fit,type=downsize;Crop,rect=(0,0,600,600),gravity=Center,allowExpansion' },
//   { id: 3, name: 'Wireless Earbuds', price: '£89.99', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/8/1/6825f5ff-e528-4b5a-85d9-72952babf307_LHSZ5CF0QK.png' },
//   { id: 4, name: 'Portable Bluetooth Speaker', price: '£59.99', image: 'https://via.placeholder.com/300x300?text=Bluetooth+Speaker' },
//   { id: 5, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/camera1.jpg' },
//   { id: 6, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/laptop.jpg' },
//   { id: 7, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/watch1.jpg' },
//   { id: 8, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 9, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 10, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 11, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 12, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 13, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 14, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 15, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 16, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 17, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 18, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },
//   { id: 19, name: 'Portable Bluetooth Speaker', price: '£59.99', image: '/assets/speaker1.jpg' },

// ];

// function Product() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Featured Products</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col">
            
//             <div className="flex justify-center">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-64 object-contain rounded-md"
//               />
//             </div>
            
//             <h2 className="text-2xl font-semibold mt-4 text-gray-800">{product.name}</h2>
//             <p className="text-xl text-gray-700 mt-2">{product.price}</p>
            
//             <div className="mt-auto flex justify-between items-center">
//               <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500 transition">
//                 Add to Cart
//               </button>

//               <button className="bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400 transition">
//                 ♥ Favorite
//               </button>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Product;





// import React from 'react';

// // Example Product Data
// const products = [
//   { id: 1, name: 'Beats Studio Wireless', price: '£499.99', image: 'https://media.sweetwater.com/api/i/q-82__h-750__ha-d7b5f966f7d6857a__hmac-655dc2e3738091e2fa3c77139ba442c45aca32f5/images/closeup/750-BeatsStu2WBk_detail2.jpg' },
//   { id: 2, name: 'AirPods Pro', price: '£249.99', image: 'https://assets.mydeal.com.au/47684/airpods-max-usb-c-starlight-12787455_4.jpg?v=638657447625213530&im=Resize,width=600,height=600,aspect=fit,type=downsize;Crop,rect=(0,0,600,600),gravity=Center,allowExpansion' },
//   { id: 3, name: 'Wireless Earbuds', price: '£89.99', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/8/1/6825f5ff-e528-4b5a-85d9-72952babf307_LHSZ5CF0QK.png' },
//   { id: 4, name: 'Portable Bluetooth Speaker', price: '£59.99', image: 'https://via.placeholder.com/300x300?text=Bluetooth+Speaker' },
//   { id: 5, name: 'Camera Accessory', price: '£199.99', image: '/assets/camera1.jpg' },
//   { id: 6, name: 'Laptop Accessory', price: '£129.99', image: '/assets/laptop.jpg' },
//   { id: 7, name: 'Smart Watch', price: '£149.99', image: '/assets/watch1.jpg' },
//   { id: 8, name: 'Speaker System', price: '£99.99', image: '/assets/speaker1.jpg' },
// ];

// function Product() {
//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Shop Our Best Products</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col"
//             >
//               <div className="flex justify-center items-center h-48 bg-gray-50 rounded overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-contain h-full"
//                 />
//               </div>

//               <h2 className="text-lg font-semibold mt-4 text-gray-800">{product.name}</h2>
//               <p className="text-md text-gray-600 mt-1">{product.price}</p>

//               <div className="mt-4 flex space-x-2">
//                 <button className="flex-1 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transition">
//                   Add to Cart
//                 </button>
//                 <button className="bg-gray-300 text-gray-800 px-4 rounded hover:bg-gray-400 transition">
//                   ♥
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Product;






import React, { useState } from 'react';

// Example Product Data with categories
const products = [
  { id: 1, name: 'Beats Studio Wireless', price: '£499.99', image: 'https://media.sweetwater.com/api/i/q-82__h-750__ha-d7b5f966f7d6857a__hmac-655dc2e3738091e2fa3c77139ba442c45aca32f5/images/closeup/750-BeatsStu2WBk_detail2.jpg', category: 'Headphones' },
  { id: 2, name: 'AirPods Pro', price: '£249.99', image: 'https://assets.mydeal.com.au/47684/airpods-max-usb-c-starlight-12787455_4.jpg?v=638657447625213530&im=Resize,width=600,height=600,aspect=fit,type=downsize;Crop,rect=(0,0,600,600),gravity=Center,allowExpansion', category: 'Headphones' },
  { id: 3, name: 'Wireless Earbuds', price: '£89.99', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/8/1/6825f5ff-e528-4b5a-85d9-72952babf307_LHSZ5CF0QK.png', category: 'Earbuds' },
  { id: 4, name: 'Portable Bluetooth Speaker', price: '£59.99', image: 'https://via.placeholder.com/300x300?text=Bluetooth+Speaker', category: 'Speakers' },
  { id: 5, name: 'Camera Accessory', price: '£199.99', image: '/assets/camera1.jpg', category: 'Accessories' },
  { id: 6, name: 'Laptop Accessory', price: '£129.99', image: '/assets/laptop.jpg', category: 'Accessories' },
  { id: 7, name: 'Smart Watch', price: '£149.99', image: '/assets/watch1.jpg', category: 'Wearables' },
  { id: 8, name: 'Speaker System', price: '£99.99', image: '/assets/speaker1.jpg', category: 'Speakers' },
];

function Product() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Headphones', 'Earbuds', 'Speakers', 'Accessories', 'Wearables'];

  // Filtered product list based on category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Shop Our Best Products</h1>

        {/* Search + Category Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-1/2 p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full sm:w-1/4 p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col"
              >
                <div className="flex justify-center items-center h-48 bg-gray-50 rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-full"
                  />
                </div>

                <h2 className="text-lg font-semibold mt-4 text-gray-800">{product.name}</h2>
                <p className="text-md text-gray-600 mt-1">{product.price}</p>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transition">
                    Add to Cart
                  </button>
                  <button className="bg-gray-300 text-gray-800 px-4 rounded hover:bg-gray-400 transition">
                    ♥
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Product;



