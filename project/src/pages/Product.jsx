
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Search, ShoppingCart, Filter, Eye } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import api from "../Api/Axios_Instance";
import { AuthContext } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDetail from "../components/ProductDetail";

function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");
    if (categoryFromURL) setSelectedCategory(categoryFromURL);
  }, [location.search]);

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

  const categories = ["All", "Headphones", "Earbuds", "Speakers", "Watches", "Power Bank"];

  const displayedProducts = useMemo(() => {
    let items = [...products];
    const parsePrice = (price) => parseFloat(String(price).replace(/[^\d.]/g, ""));
    if (sortBy === "price-asc") items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price-desc") items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return items.filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = async (product) => {
    if (!user) return toast.error("Please log in to add items to your cart.");
    try {
      const res = await api.get(`/users/${user.id}`);
      let cart = res.data.cart || [];
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        cart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      await api.patch(`/users/${user.id}`, { cart });
      toast.success(`${product.name} added to cart!`);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      toast.error("Failed to add item to cart.");
    }
  };

  const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-right" />
      <main className="flex-grow pt-20">
        {!selectedProduct ? (
          <>
            {/* ✅ Hero Section */}
            <section
              className="relative bg-cover bg-center text-white py-16 sm:py-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop')",
              }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl font-bold mb-3"
                >
                  Shop Our Best Products
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base md:text-lg text-gray-200"
                >
                  Find the perfect accessories for your tech life.
                </motion.p>
              </div>
            </section>

            {/* ✅ Filters + Search */}
            <div className="max-w-7xl mx-auto px-4 py-10">
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4 md:items-center">
                {/* Search */}
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Categories */}
                <div className="flex-grow flex gap-2 overflow-x-auto pb-2 sm:justify-start scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-sm rounded-full font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? "bg-red-500 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full md:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full md:w-auto p-3 pr-8 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold text-gray-700"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <Filter
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* ✅ Products Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
              >
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariant}
                      className="bg-white group rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-48 sm:h-56 flex items-center justify-center p-4 bg-white">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                          />
                        </div>
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="p-3 bg-white text-gray-800 rounded-full hover:bg-red-500 hover:text-white transition transform hover:scale-110"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className={`p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition transform hover:scale-110 ${
                              wishlist.some((item) => item.id === product.id)
                                ? "text-red-500"
                                : "text-gray-800"
                            }`}
                          >
                            <Heart
                              size={20}
                              fill={
                                wishlist.some((item) => item.id === product.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h2
                          onClick={() => setSelectedProduct(product)}
                          className="text-base font-semibold text-gray-800 truncate cursor-pointer mt-1"
                        >
                          {product.name}
                        </h2>
                        <p className="text-lg text-red-500 font-bold mt-auto pt-2">
                          ₹{product.price}
                        </p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} /> Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-600 col-span-full">
                    No products found matching your criteria.
                  </p>
                )}
              </motion.div>
            </div>
          </>
        ) : (
          <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Product;


