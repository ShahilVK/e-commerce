// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer"

// function Profile() {
//   const { user } = useContext(AuthContext);

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


//     <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">

//       <Navbar />
      
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

//       <div className="space-y-4">
//         <div className="flex justify-between border-b pb-2">
//           <span className="font-semibold text-gray-600">Username:</span>
//           <span className="text-gray-800">{user.username}</span>
//         </div>

//         <div className="flex justify-between border-b pb-2">
//           <span className="font-semibold text-gray-600">Email:</span>
//           <span className="text-gray-800">{user.email}</span>
//         </div>

//         <div className="flex justify-between border-b pb-2">
//           <span className="font-semibold text-gray-600">Role:</span>
//           <span className="text-gray-800 capitalize">{user.role}</span>
//         </div>
//       </div>

//       {/* You can expand with more details */}
//       <div className="mt-6">
//         <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
//           Edit Profile
//         </button>
//       </div>


      
//     </div>
    

    
    
//   );
// }

// export default Profile;













import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load data from localStorage (you can replace this with API later)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setCart(storedCart);
    setWishlist(storedWishlist);
    setOrders(storedOrders);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 font-semibold">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">UserID:</span>
            <span className="text-gray-800">{user.id || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Username:</span>
            <span className="text-gray-800">{user.username}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Role:</span>
            <span className="text-gray-800 capitalize">{user.role}</span>
          </div>
        </div>

        {/* Cart Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">🛒 Cart Items</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items in cart</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between p-3 border rounded-lg"
                >
                  <span>{item.name}</span>
                  <span className="text-yellow-600 font-semibold">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Wishlist Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">❤️ Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-600">No items in wishlist</p>
          ) : (
            <ul className="space-y-2">
              {wishlist.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between p-3 border rounded-lg"
                >
                  <span>{item.name}</span>
                  <span className="text-yellow-600 font-semibold">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Orders Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">📦 Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders placed yet</p>
          ) : (
            <ul className="space-y-2">
              {orders.map((order, index) => (
                <li
                  key={index}
                  className="p-3 border rounded-lg space-y-2 bg-gray-50"
                >
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {order.id || `ORD-${index + 1}`}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {order.date || new Date().toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Product:</span>{" "}
                    {order.productName}
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span>{" "}
                    <span className="text-yellow-600 font-bold">
                      {order.total}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Edit Profile
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
