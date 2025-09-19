

import React from "react";
import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow rounded-lg p-4 flex flex-col"
              >
                <div className="flex justify-center items-center h-40 bg-gray-50 rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-full"
                  />
                </div>

                <h2 className="text-lg font-semibold mt-3 text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600">₹{product.price}</p>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;
