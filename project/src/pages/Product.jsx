
import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import ProductDetail from "../components/ProductDetail";
import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";

function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { wishlist, toggleWishlist } = useWishlist();
  const location = useLocation();

  // ✅ Read category from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [location.search]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      }
    };
    fetchProduct();
  }, []);

  const categories = [
    "All",
    "Headphones",
    "Earbuds",
    "Speakers",
    "Watches",
    "Power Bank",
  ];

  // ✅ Filter products dynamically
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-gray-200 py-20 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Shop Our Best Products
        </h1>

        {/* 🔎 Search + Categories */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2 mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 
                transition placeholder-gray-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Category Buttons */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:justify-center scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition 
                  ${
                    selectedCategory === cat
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🛒 Product Grid */}
        {!selectedProduct ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col transform hover:scale-105"
                >
                  {/* Image → open details */}
                  <div
                    className="flex justify-center items-center h-48 bg-gray-50 rounded overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain h-full transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  {/* Title & Price */}
                  <h2
                    onClick={() => setSelectedProduct(product)}
                    className="text-lg font-semibold mt-4 text-gray-800 cursor-pointer hover:text-red-600 transition-colors"
                  >
                    {product.name}
                  </h2>
                  <p className="text-md text-gray-600 mt-1">₹{product.price}</p>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      className="flex-1 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transition duration-300"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.some((item) => item.id === product.id)
                            ? "text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No products found.
              </p>
            )}
          </div>
        ) : (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
}

export default Product;
