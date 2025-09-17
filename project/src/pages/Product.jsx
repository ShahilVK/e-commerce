import React from 'react';

// Example Product Data
const products = [
  { id: 1, name: 'Beats Studio Wireless', price: '£499.99', image: 'https://media.sweetwater.com/api/i/q-82__h-750__ha-d7b5f966f7d6857a__hmac-655dc2e3738091e2fa3c77139ba442c45aca32f5/images/closeup/750-BeatsStu2WBk_detail2.jpg' },
  { id: 2, name: 'AirPods Pro', price: '£249.99', image: 'https://assets.mydeal.com.au/47684/airpods-max-usb-c-starlight-12787455_4.jpg?v=638657447625213530&im=Resize,width=600,height=600,aspect=fit,type=downsize;Crop,rect=(0,0,600,600),gravity=Center,allowExpansion' },
  { id: 3, name: 'Wireless Earbuds', price: '£89.99', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/8/1/6825f5ff-e528-4b5a-85d9-72952babf307_LHSZ5CF0QK.png' },
  { id: 4, name: 'Portable Bluetooth Speaker', price: '£59.99', image: 'https://via.placeholder.com/300x300?text=Bluetooth+Speaker' },
  { id: 5, name: 'Portable Bluetooth Speaker', price: '£59.99', image: "/assets/speaker1.jpg" },
];

function Product() {
  return (
    <div className="min-h-screen bg-grey-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
            />
            
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-lg text-gray-700 mt-2">{product.price}</p>
            
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
