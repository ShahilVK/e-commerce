
import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        // take only first 8 products for better grid display
        setProducts(res.data.slice(0, 8));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);
  
  const handleActionClick = (e, message) => {
      e.stopPropagation(); // Prevent card's navigation
      toast.success(message);
      // In a real app, you'd also update the cart/wishlist state here.
  };

  return (
    <section className="bg-teal-50/50 py-20 w-full">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
                Featured Products
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
                Explore our handpicked selection of top-rated electronics.
            </p>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate('/product')}
              className="group cursor-pointer relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden bg-white p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Action buttons on hover */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={(e) => handleActionClick(e, `${product.name} added to cart!`)} className="p-2.5 bg-white rounded-full shadow-lg hover:bg-teal-500 hover:text-white text-gray-700 transition-all transform hover:scale-110">
                      <ShoppingCart size={18} />
                  </button>
                  <button onClick={(e) => handleActionClick(e, `${product.name} added to wishlist!`)} className="p-2.5 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white text-gray-700 transition-all transform hover:scale-110">
                      <Heart size={18} />
                  </button>
              </div>

              <div className="p-4 border-t border-gray-100 flex flex-col flex-grow">
                 {/* Category */}
                 <div className="mb-2">
                    <div className="text-xs font-medium text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full inline-block">{product.category}</div>
                 </div>

                {/* Product Name */}
                <h3 className="text-base font-semibold text-gray-800 transition truncate flex-grow group-hover:text-teal-600">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-500">(24 reviews)</span>
                </div>

                {/* Price */}
                <div className="mt-4">
                    <p className="text-xl font-bold text-gray-900">
                        {product.price}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProducts;

