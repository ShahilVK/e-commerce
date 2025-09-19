

import React from "react";
import { Star, Plus } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    oldPrice: 39.99,
    image:
      "https://i.pinimg.com/1200x/e6/33/03/e63303eceaae9db904888540a958e734.jpg",
    rating: 4,
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    oldPrice: 49.99,
    image:
      "https://cdn.superfon.az/i/p/500/110437-8a0b8f2b4a477fc055815151543d4a70.png",
    rating: 4,
  },
  {
    id: 3,
    name: "Product 3",
    price: 19.99,
    oldPrice: 29.99,
    image:
      "https://i.pinimg.com/474x/de/9f/b7/de9fb7f59c064f6817f2289784a317f6.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    oldPrice: 59.99,
    image:
      "https://i.pinimg.com/736x/cd/f2/6a/cdf26a7f84b5465a0e029df106eebc4f.jpg",
    rating: 3,
  },
  {
    id: 5,
    name: "Product 5",
    price: 24.99,
    oldPrice: 34.99,
    image:
      "https://i.pinimg.com/736x/ad/37/e4/ad37e43d5abc667c2688b1492eb1e1f4.jpg",
    rating: 4,
  },
];

const TopProducts = () => {
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
                  ${product.price}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.oldPrice}
                </span>
              </div>

              {/* Rating */}
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Add Button */}
              <button className="mt-3 p-2 bg-red-500 rounded-full hover:bg-red-600 transition transform group-hover:scale-110">
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
