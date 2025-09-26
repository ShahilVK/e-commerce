
import React from "react";
import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartCrack, ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";


function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  // This would typically come from a CartContext, but we'll simulate it for now.
  const handleAddToCart = (productName) => {
    toast.success(`${productName} added to cart!`);
    // In a real app: cartContext.addToCart(product);
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            {wishlist.length > 0 && (
                <p className="text-gray-500">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
            )}
          </motion.div>

          {wishlist.length === 0 ? (
            // ✨ 1. New, more engaging empty state
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <HeartCrack size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">Your Wishlist is Empty</h2>
              <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything yet. Let's change that!</p>
              <Link
                to="/product"
                className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Discover Products
              </Link>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {wishlist.map((product) => (
                  // ✨ 2. New, more interactive product card design
                  <motion.div
                    key={product.id}
                    layout
                    variants={itemVariant}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white group rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                  >
                    <div className="relative">
                      <div className="w-full h-56 bg-gray-100 flex items-center justify-center p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                          />
                      </div>
                      {/* Remove button appears on hover */}
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-2 right-2 p-2 bg-white/50 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={20}/>
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                      <p className="text-red-500 font-bold mt-1 mb-4">₹{product.price}</p>
                      
                      {/* Add to Cart button */}
                      <button
                        onClick={() => handleAddToCart(product.name)}
                        className="w-full mt-auto bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Wishlist;
