







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate grand total
  const grandTotal = cartItems
    .reduce(
      (acc, item) =>
        acc +
        parseFloat(item.price.replace(/[^\d.]/g, "")) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  const handleCheckout = () => {
    // Clear Buy Now to prevent duplicates
    localStorage.removeItem("buyNowItem");
    navigate("/payment");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Your cart is empty 🛒</p>
          <button
            onClick={() => navigate("/product")}
            className="bg-yellow-600 text-white px-6 py-3 rounded hover:bg-yellow-500 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain rounded"
              />

              {/* Info */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  Price: ₹{item.price} × {item.quantity || 1}
                </p>
              </div>

              {/* Total */}
              <p className="text-xl font-bold text-yellow-600">
                ₹
                {(
                  parseFloat(item.price.replace(/[^\d.]/g, "")) *
                  (item.quantity || 1)
                ).toFixed(2)}
              </p>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Grand Total */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mt-6">
            <h2 className="text-xl font-bold">Grand Total:</h2>
            <p className="text-2xl font-bold text-yellow-600">₹{grandTotal}</p>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
