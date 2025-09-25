

// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";
// import { Menu, X } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";

// const sec = [
//   { id: 1, name: "Home", link: "/" },
//   { id: 2, name: "Shop", link: "/product" },
//   { id: 3, name: "About", link: "/about" },
//   { id: 4, name: "Contact", link: "/contact" },
// ];

// function Navbar() {
//   const navigate = useNavigate();
//   const { wishlist } = useWishlist();
//   const { user, logout } = useContext(AuthContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   const calculateCartCount = () => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     return storedCart.length;
//   };

//   useEffect(() => {
//     if (user) {
//       setCartCount(calculateCartCount());
//       const handleCartUpdate = () => setCartCount(calculateCartCount());
//       window.addEventListener("cartUpdated", handleCartUpdate);
//       window.addEventListener("storage", handleCartUpdate);
//       return () => {
//         window.removeEventListener("cartUpdated", handleCartUpdate);
//         window.removeEventListener("storage", handleCartUpdate);
//       };
//     } else {
//       setCartCount(0);
//     }
//   }, [user]);

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 transition duration-200"
//         >
//           TekTrov
//         </h1>

//         {/* Desktop Links */}
//         <div className="hidden lg:flex gap-6">
//           {sec.map((data) => (
//             <button
//               key={data.id}
//               onClick={() => navigate(data.link)}
//               className="relative font-semibold text-gray-800 hover:text-red-500 transition-all duration-300
//                          after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full
//                          hover:shadow-md hover:shadow-red-200"
//             >
//               {data.name}
//             </button>
//           ))}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4 sm:gap-6">
//           {/* Wishlist */}
//           <div
//             className="relative cursor-pointer hover:scale-110 transition duration-200"
//             onClick={() => navigate("/wishlist")}
//           >
//             <img className="w-6 sm:w-7" src="/assets/love1.svg" alt="Wishlist" />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>

//           {/* Cart */}
//           <div
//             className="relative cursor-pointer hover:scale-110 transition duration-200"
//             onClick={() => navigate("/cart")}
//           >
//             <img className="w-6 sm:w-7" src="/assets/cart.svg" alt="Cart" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {cartCount}
//               </span>
//             )}
//           </div>

//           {/* Login/Profile */}
//           {!user ? (
//             <img
//               onClick={() => navigate("/login")}
//               className="w-6 sm:w-8 cursor-pointer hover:scale-110 hover:opacity-80 transition duration-200"
//               src="/assets/login.svg"
//               alt="Login"
//             />
//           ) : (
//             <div className="flex items-center gap-2 sm:gap-4">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition duration-200"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={() => {
//                   logout();
//                   setCartCount(0);
//                   localStorage.removeItem("cart");
//                 }}
//                 className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
//               >
//                 Logout
//               </button>
//             </div>
//           )}

//           {/* Mobile Menu */}
//           <button
//             className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md">
//           <ul className="flex flex-col items-center gap-4 py-4">
//             {sec.map((data) => (
//               <li key={data.id}>
//                 <button
//                   onClick={() => {
//                     navigate(data.link);
//                     setMenuOpen(false);
//                   }}
//                   className="block px-4 py-2 font-semibold text-gray-800 hover:text-red-500 transition duration-200"
//                 >
//                   {data.name}
//                 </button>
//               </li>
//             ))}
//             <li className="w-full px-6">
//               <input
//                 type="text"
//                 placeholder="Search Products"
//                 className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
//               />
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;












// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";
// import { Menu, X } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";

// const sec = [
//   { id: 1, name: "Home", link: "/" },
//   { id: 2, name: "Shop", link: "/product" },
//   { id: 3, name: "About", link: "/about" },
//   { id: 4, name: "Contact", link: "/contact" },
// ];

// function Navbar() {
//   const navigate = useNavigate();
//   const { wishlist } = useWishlist();
//   const { user, logout } = useContext(AuthContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   const calculateCartCount = () => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     return storedCart.length;
//   };

//   useEffect(() => {
//     if (user) {
//       setCartCount(calculateCartCount());
//       const handleCartUpdate = () => setCartCount(calculateCartCount());
//       window.addEventListener("cartUpdated", handleCartUpdate);
//       window.addEventListener("storage", handleCartUpdate);
//       return () => {
//         window.removeEventListener("cartUpdated", handleCartUpdate);
//         window.removeEventListener("storage", handleCartUpdate);
        
//       };
//     } else {
//       setCartCount(0);
//     }
//   }, [user]);

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 transition duration-200"
//         >
//           TekTrov
//         </h1>

//         {/* Desktop Links */}
//         <div className="hidden lg:flex gap-6">
//           {sec.map((data) => (
//             <button
//               key={data.id}
//               onClick={() => navigate(data.link)}
//               className="relative font-semibold text-gray-800
//                         transition-all duration-300 hover:text-red-500
//                         after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:shadow-md hover:shadow-red-200"
//             >
//               {data.name}
//             </button>
//           ))}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4 sm:gap-6">
//           {/* Wishlist */}
//           <div
//             className="relative cursor-pointer transform transition duration-300 hover:scale-125 hover:shadow-lg"
//             onClick={() => navigate("/wishlist")}
//           >
//             <img className="w-6 sm:w-7 hover:animate-bounce" src="/assets/love1.svg" alt="Wishlist" />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>

//           {/* Cart */}
//           <div
//             className="relative cursor-pointer transform transition duration-300 hover:scale-125 hover:shadow-lg"
//             onClick={() => navigate("/cart")}
//           >
//             <img className="w-6 sm:w-7 hover:animate-bounce" src="/assets/cart.svg" alt="Cart" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
//                 {cartCount}
//               </span>
//             )}
//           </div>

//           {/* Login/Profile */}
//           {!user ? (
//             <img
//               onClick={() => navigate("/login")}
//               className="w-6 sm:w-8 cursor-pointer hover:scale-110 hover:opacity-80 transition duration-200"
//               src="/assets/login.svg"
//               alt="Login"
//             />
//           ) : (
//             <div className="flex items-center gap-2 sm:gap-4">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition duration-200 hover:shadow-md"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={() => {
//                   logout();
//                   setCartCount(0);
//                   localStorage.removeItem("cart");
//                 }}
//                 className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200 hover:shadow-lg"
//               >
//                 Logout
//               </button>
//             </div>
//           )}

//           {/* Mobile Menu */}
//           <button
//             className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md">
//           <ul className="flex flex-col items-center gap-4 py-4">
//             {sec.map((data) => (
//               <li key={data.id}>
//                 <button
//                   onClick={() => {
//                     navigate(data.link);
//                     setMenuOpen(false);
//                   }}
//                   className="block px-4 py-2 font-semibold text-gray-800 hover:text-red-500 transition duration-200"
//                 >
//                   {data.name}
//                 </button>
//               </li>
//             ))}
//             <li className="w-full px-6">
//               <input
//                 type="text"
//                 placeholder="Search Products"
//                 className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
//               />
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
















import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../Api/Axios_Instance";

const navLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/product" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from DB
  const fetchCartCount = async () => {
    if (user) {
      try {
        const res = await api.get(`/users/${user.id}`);
        setCartCount(res.data.cart?.length || 0);
      } catch (err) {
        console.error(err);
      }
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [user]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 onClick={() => navigate("/")} className="text-2xl sm:text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 transition duration-200">
          TekTrov
        </h1>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigate(link.link)}
              className="relative font-semibold text-gray-800 transition-all duration-300 hover:text-red-500"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Wishlist */}
          <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
            <img className="w-6 sm:w-7 hover:animate-bounce" src="/assets/love1.svg" alt="Wishlist" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <img className="w-6 sm:w-7 hover:animate-bounce" src="/assets/cart.svg" alt="Cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </div>

          {/* Login/Profile */}
          {!user ? (
            <img onClick={() => navigate("/login")} className="w-6 sm:w-8 cursor-pointer hover:scale-110 transition duration-200" src="/assets/login.svg" alt="Login" />
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={() => navigate("/profile")} className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition duration-200">
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setCartCount(0);
                }}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => {
                    navigate(link.link);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 font-semibold text-gray-800 hover:text-red-500 transition duration-200"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
