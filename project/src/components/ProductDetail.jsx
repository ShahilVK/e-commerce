



import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";
import { motion } from "framer-motion";
import { ChevronLeft, Minus, Plus, ShoppingCart, Zap, Star } from "lucide-react";

function ProductDetail({ product, onBack }) {
  const [count, setCount] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const basePrice = parseFloat(String(product.price).replace(/[^\d.]/g, "")) || 0;
  const totalPrice = (basePrice * count).toFixed(2);

  // --- Core logic remains unchanged ---
  const addToCart = async () => {
    if (!user) {
      return navigate("/login");
    }
    try {
      const res = await api.get(`/users/${user.id}`);
      let cart = res.data.cart || [];
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        cart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + count } : item
        );
      } else {
        cart.push({ ...product, quantity: count });
      }

      await api.patch(`/users/${user.id}`, { cart });
      toast.success(`${product.name} added to cart!`);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate("/payment", { state: { buyNowItem: { ...product, quantity: count } } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto my-8"
    >
      <Toaster position="top-right" />
      <button onClick={onBack} className="flex items-center gap-2 mb-6 text-red-500 hover:text-red-700 font-semibold transition-colors">
        <ChevronLeft size={20} /> Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-xl p-4">
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image} 
            alt={product.name} 
            className="object-contain h-80 w-full" 
          />
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-4">
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">{product.category || 'Featured'}</span>
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          
          {/* ✨ 1. New Star Rating and Stock Status */}
          <div className="flex items-center gap-4">
            <div className="flex text-yellow-400">
                <Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star size={20}/>
            </div>
            <span className="text-green-600 font-semibold">In Stock</span>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.smallDescription || "Experience premium quality and design with this top-rated accessory for your mobile lifestyle."}
          </p>
          
          <p className="text-4xl font-bold text-gray-900 mt-2">₹{basePrice.toFixed(2)}</p>

          <div className="border-t pt-4 space-y-4">
            {/* ✨ 2. Redesigned Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-700">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setCount((prev) => Math.max(1, prev - 1))} className="p-3 hover:bg-gray-100 rounded-l-lg transition">
                  <Minus size={16} />
                </button>
                <span className="text-xl font-semibold px-4">{count}</span>
                <button onClick={() => setCount((prev) => prev + 1)} className="p-3 hover:bg-gray-100 rounded-r-lg transition">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <p className="text-2xl font-bold text-red-600">Total: ₹{totalPrice}</p>
          </div>

          {/* ✨ 3. New Modern Action Buttons with Icons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={addToCart} className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-transform transform hover:scale-105">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button onClick={handleBuyNow} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-transform transform hover:scale-105">
              <Zap size={20} /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;








