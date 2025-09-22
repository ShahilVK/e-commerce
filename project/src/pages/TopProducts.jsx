



// import React, { useEffect, useState } from "react";
// import { Star, Plus } from "lucide-react";
// import axios from "axios";

// const TopProducts = () => {
//   const [products, setProducts] = useState([]);

//   // Fetch products from db.json
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/products") // 🔗 JSON Server endpoint
//       .then((res) => {
//         // take only first 5 products
//         setProducts(res.data.slice(0, 5));
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//       });
//   }, []);

//   return (
//     <section className="bg-white py-12 w-full">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Section Title */}
//         <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-red-500 pl-3">
//           Top Products
//         </h2>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="group border rounded-lg p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
//               {/* Product Image */}
//               <div className="overflow-hidden w-full flex justify-center">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-32 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
//                 />
//               </div>

//               {/* Product Name */}
//               <h3 className="text-gray-800 font-semibold group-hover:text-red-500 transition">
//                 {product.name}
//               </h3>

//               {/* Price */}
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-red-600 font-bold text-lg">
//                   {product.price}
//                 </span>
//               </div>

//               {/* Category */}
//               <p className="text-sm text-gray-500 mt-1">{product.category}</p>

//               {/* Fake Rating (since db.json has no rating) */}
//               <div className="flex mt-2">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < 4
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Add Button */}
//               <button className="mt-3 p-2 bg-red-500 rounded-full hover:bg-red-600 transition transform group-hover:scale-110">
//                 <Plus className="text-white w-5 h-5" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopProducts;







import React, { useEffect, useState } from "react";
import { Star, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        // take only first 5 products
        setProducts(res.data.slice(0, 5));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <section className="bg-white py-12 w-full">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-red-500 pl-3">
          Top Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group border rounded-lg p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="overflow-hidden w-full flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-gray-800 font-semibold group-hover:text-red-500 transition">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-red-600 font-bold text-lg">
                  {product.price}
                </span>
              </div>

              {/* Category */}
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>

              {/* Fake Rating */}
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Add Button -> Navigate to Product Page */}
              <button
                onClick={() => navigate("/product")}
                className="mt-3 p-2 bg-red-500 rounded-full hover:bg-red-600 transition transform group-hover:scale-110"
              >
                <Plus className="text-white w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
