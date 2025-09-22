


import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const sec = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/product" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/footer" },
];

function Navbar() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cart count state
  const [cartCount, setCartCount] = useState(0);

  // Calculate cart count: only count unique products
  const calculateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart.length; // 1 per unique product
  };

  useEffect(() => {
    if (user) {
      setCartCount(calculateCartCount());

      const handleCartUpdate = () => {
        setCartCount(calculateCartCount());
      };

      window.addEventListener("cartUpdated", handleCartUpdate);
      window.addEventListener("storage", handleCartUpdate);

      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate);
        window.removeEventListener("storage", handleCartUpdate);
      };
    } else {
      setCartCount(0);
    }
  }, [user]);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-red-500 sm:text-3xl cursor-pointer hover:scale-105 duration-200"
        >
          TekTrov
        </h1>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6">
          {sec.map((data) => (
            <button
              key={data.id}
              onClick={() => navigate(data.link)}
              className="font-semibold text-gray-800 hover:text-red-500 duration-200"
            >
              {data.name}
            </button>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search Products"
              className="px-4 py-2 border rounded-full w-48 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Wishlist */}
          <div
            className="relative cursor-pointer hover:scale-110 duration-200"
            onClick={() => navigate("/wishlist")}
          >
            <img className="w-7" src="/assets/love1.svg" alt="favourite" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer hover:scale-110 duration-200"
            onClick={() => navigate("/cart")}
          >
            <img className="w-7" src="/assets/cart.svg" alt="Cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </div>

          {/* Login / Profile */}
          {!user ? (
            <img
              onClick={() => navigate("/login")}
              className="w-8 cursor-pointer hover:scale-110 hover:opacity-80 duration-200"
              src="/assets/login.svg"
              alt="Login"
            />
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 duration-200"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setCartCount(0);
                  localStorage.removeItem("cart");
                }}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 duration-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center gap-4 py-4">
            {sec.map((data) => (
              <li key={data.id}>
                <button
                  onClick={() => {
                    navigate(data.link);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 font-semibold text-gray-800 hover:text-red-500 duration-200"
                >
                  {data.name}
                </button>
              </li>
            ))}
            <li className="w-full px-6">
              <input
                type="text"
                placeholder="Search Products"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
