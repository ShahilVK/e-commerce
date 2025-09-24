



// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function Profile() {
//   const { user } = useContext(AuthContext);
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // Load data from localStorage (you can replace this with API later)
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     setCart(storedCart);
//     setWishlist(storedWishlist);
//     setOrders(storedOrders);
//   }, []);

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg text-gray-600 font-semibold">
//           Please log in to view your profile.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

//         {/* User Info */}
//         <div className="space-y-4">
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold text-gray-600">UserID:</span>
//             <span className="text-gray-800">{user.id || "N/A"}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold text-gray-600">Username:</span>
//             <span className="text-gray-800">{user.username}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold text-gray-600">Email:</span>
//             <span className="text-gray-800">{user.email}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold text-gray-600">Role:</span>
//             <span className="text-gray-800 capitalize">{user.role}</span>
//           </div>
//         </div>

//         {/* Cart Section */}
//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-4">🛒 Cart Items</h2>
//           {cart.length === 0 ? (
//             <p className="text-gray-600">No items in cart</p>
//           ) : (
//             <ul className="space-y-2">
//               {cart.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between p-3 border rounded-lg"
//                 >
//                   <span>{item.name}</span>
//                   <span className="text-yellow-600 font-semibold">
//                     {item.price}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Wishlist Section */}
//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-4">❤️ Wishlist</h2>
//           {wishlist.length === 0 ? (
//             <p className="text-gray-600">No items in wishlist</p>
//           ) : (
//             <ul className="space-y-2">
//               {wishlist.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between p-3 border rounded-lg"
//                 >
//                   <span>{item.name}</span>
//                   <span className="text-yellow-600 font-semibold">
//                     {item.price}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Orders Section */}
//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-4">📦 Orders</h2>
//           {orders.length === 0 ? (
//             <p className="text-gray-600">No orders placed yet</p>
//           ) : (
//             <ul className="space-y-2">
//               {orders.map((order, index) => (
//                 <li
//                   key={index}
//                   className="p-3 border rounded-lg space-y-2 bg-gray-50"
//                 >
//                   <p>
//                     <span className="font-semibold">Order ID:</span>{" "}
//                     {order.id || `ORD-${index + 1}`}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Date:</span>{" "}
//                     {order.date || new Date().toLocaleDateString()}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Product:</span>{" "}
//                     {order.productName}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Total:</span>{" "}
//                     <span className="text-yellow-600 font-bold">
//                       {order.total}
//                     </span>
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Edit Profile Button */}
//         <div className="mt-6">
//           <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Profile;














import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart, Heart, Package, User } from "lucide-react";

function Profile() {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load from localStorage & update dynamically
  const loadData = () => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  };

  useEffect(() => {
    loadData();

    // Listen for localStorage changes (cross-tab)
    const handleStorageChange = () => loadData();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600 font-semibold">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto mt-24 p-6 space-y-10">
        {/* User Info */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 shadow-lg rounded-2xl p-6 flex items-center gap-6">
          <User size={60} className="text-white" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-gray-800 font-medium">{user.email}</p>
            <span className="text-gray-700 bg-white/50 px-3 py-1 rounded-full mt-2 inline-block">
              Role: {user.role}
            </span>
            <p className="text-gray-700 mt-1">
              User ID: <span className="font-semibold">{user.id || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition relative">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="text-yellow-500" />
              <h3 className="text-lg font-bold">Cart Items</h3>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500">No items in cart</p>
            ) : (
              <ul className="space-y-2 max-h-52 overflow-y-auto">
                {cart.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 border-b pb-1 last:border-b-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="font-semibold text-yellow-600">
                      ₹{((parseFloat(item.price.replace(/[^\d.]/g, "")) || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <span className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm">
              {cart.length}
            </span>
          </div>

          {/* Wishlist Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition relative">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-red-500" />
              <h3 className="text-lg font-bold">Wishlist</h3>
            </div>
            {wishlist.length === 0 ? (
              <p className="text-gray-500">No items in wishlist</p>
            ) : (
              <ul className="space-y-2 max-h-52 overflow-y-auto">
                {wishlist.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 border-b pb-1 last:border-b-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="font-semibold text-red-500">
                      ₹{((parseFloat(item.price.replace(/[^\d.]/g, "")) || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {wishlist.length}
            </span>
          </div>

          {/* Orders Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition relative">
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-green-500" />
              <h3 className="text-lg font-bold">Orders</h3>
            </div>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders placed yet</p>
            ) : (
              <ul className="space-y-2 max-h-52 overflow-y-auto">
                {orders.map((order, i) => (
                  <li key={i} className="border p-2 rounded-md hover:bg-green-50 transition">
                    <p className="text-sm">
                      <span className="font-semibold">Order ID:</span>{" "}
                      {order.id || `ORD-${i + 1}`}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Date:</span>{" "}
                      {order.date || new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Product:</span>{" "}
                      {order.productName}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      ₹{order.total}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
