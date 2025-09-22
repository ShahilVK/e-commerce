import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Plus } from "lucide-react";

const ProductsWithFilter = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        const cats = ["All", ...new Set(res.data.map((p) => p.category))];
        setCategories(cats);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === category));
    }
  };

  return (
    <section className="bg-white py-12 w-full">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-500 pl-3">
          Top Products
        </h2>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filtered.map((product) => (
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

              {/* Fake Rating */}
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(Math.random() * 5) + 1
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

export default ProductsWithFilter;
