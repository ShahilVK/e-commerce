import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";

function ProductDetail({ product, onBack }) {
  const [count, setCount] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const basePrice = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
  const totalPrice = (basePrice * count).toFixed(2);

  // Add to Cart in database
  const addToCart = async () => {
    if (!user || !user.isAuthenticated) {
      navigate("/login");
      return;
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
      window.dispatchEvent(new Event("cartUpdated")); // update Navbar count
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Buy Now
  const handleBuyNow = async () => {
    await addToCart();
    navigate("/payment");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8">
      <Toaster position="top-right" />
      <button onClick={onBack} className="mb-4 text-red-500 hover:underline font-semibold">
        ← Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex justify-center items-center">
          <img src={product.image} alt={product.name} className="object-contain h-80 w-full rounded" />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-500 text-sm italic">
            {product.smallDescription || "Premium quality product for your needs."}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button onClick={() => setCount((prev) => Math.max(1, prev - 1))} className="bg-gray-300 px-4 py-2 rounded text-lg">-</button>
            <span className="text-xl font-semibold">{count}</span>
            <button onClick={() => setCount((prev) => prev + 1)} className="bg-gray-300 px-4 py-2 rounded text-lg">+</button>
          </div>

          <p className="text-2xl font-bold text-yellow-600 mt-2">Total: ₹{totalPrice}</p>

          <div className="flex gap-4 mt-6">
            <button onClick={addToCart} className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700 transition">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="flex-1 bg-yellow-600 text-white py-3 rounded hover:bg-yellow-500 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;












// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// function ProductDetail({ product, onBack }) {
//   const [count, setCount] = useState(1);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const basePrice = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
//   const totalPrice = (basePrice * count).toFixed(2);

//   // Add / Update Cart
//   const updateCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingItem = cart.find((item) => item.id === product.id);

//     if (existingItem) {
//       existingItem.quantity += count;
//     } else {
//       cart.push({ ...product, quantity: count });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//     toast.success(`${product.name} added to cart!`);
//   };

//   // Toggle Wishlist
//   const toggleWishlist = () => {
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const exists = wishlist.find((item) => item.id === product.id);

//     const updatedWishlist = exists
//       ? wishlist.filter((item) => item.id !== product.id)
//       : [...wishlist, product];

//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//     toast.success(
//       exists
//         ? `${product.name} removed from wishlist`
//         : `${product.name} added to wishlist`
//     );
//   };

//   const handleAddToCart = () => {
//     if (!user || !user.isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     updateCart();
//   };

//   const handleBuyNow = () => {
//     if (!user || !user.isAuthenticated) {
//       navigate("/login");
//       return;
//     }

//     const buyNowItem = { ...product, quantity: count, totalPrice };

//     // Merge Buy Now with cart if needed
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existsInCart = cart.find((item) => item.id === buyNowItem.id);
//     if (existsInCart) {
//       existsInCart.quantity += buyNowItem.quantity;
//       localStorage.setItem("cart", JSON.stringify(cart));
//       localStorage.removeItem("buyNowItem");
//     } else {
//       localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
//     }

//     navigate("/payment");
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8">
//       <Toaster position="top-right" />
//       <button
//         onClick={onBack}
//         className="mb-4 text-red-500 hover:underline font-semibold"
//       >
//         ← Back to Products
//       </button>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Image */}
//         <div className="flex-1 flex justify-center items-center">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="object-contain h-80 w-full rounded"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex-1 space-y-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-gray-500 text-sm italic">
//             {product.smallDescription ||
//               "This is a premium quality product designed for your needs."}
//           </p>
//           <p className="text-gray-600 text-lg">{product.description}</p>

//           {/* Quantity */}
//           <div className="flex items-center gap-4 mt-2">
//             <button
//               onClick={() => setCount((prev) => Math.max(1, prev - 1))}
//               className="bg-gray-300 px-4 py-2 rounded text-lg"
//             >
//               -
//             </button>
//             <span className="text-xl font-semibold">{count}</span>
//             <button
//               onClick={() => setCount((prev) => prev + 1)}
//               className="bg-gray-300 px-4 py-2 rounded text-lg"
//             >
//               +
//             </button>
//           </div>

//           <p className="text-2xl font-bold text-yellow-600 mt-2">
//             Total: ₹{totalPrice}
//           </p>

//           {/* Actions */}
//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700 transition"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 bg-yellow-600 text-white py-3 rounded hover:bg-yellow-500 transition"
//             >
//               Buy Now
//             </button>
//             <button
//               onClick={() => {
//                 if (!user || !user.isAuthenticated) {
//                   navigate("/login");
//                   return;
//                 }
//                 toggleWishlist();
//               }}
//               className="bg-gray-300 text-gray-800 px-6 rounded hover:bg-gray-400 transition"
//             >
//               ♥
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;










// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../Api/Axios_Instance";

// function ProductDetail({ product, onBack }) {
//   const [count, setCount] = useState(1);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const basePrice = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
//   const totalPrice = (basePrice * count).toFixed(2);

//   // Add / Update Cart in db.json
//   const updateCart = async () => {
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let cart = res.data.cart || [];

//       const existingItem = cart.find((item) => item.id === product.id);
//       if (existingItem) {
//         existingItem.quantity += count;
//       } else {
//         cart.push({ ...product, quantity: count });
//       }

//       await api.patch(`/users/${user.id}`, { cart });
//       toast.success(`${product.name} added to cart!`);
//     } catch (err) {
//       console.error("Error updating cart:", err);
//     }
//   };

//   // Toggle Wishlist in db.json
//   const toggleWishlist = async () => {
//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let wishlist = res.data.wishlist || [];
//       const exists = wishlist.find((item) => item.id === product.id);

//       const updatedWishlist = exists
//         ? wishlist.filter((item) => item.id !== product.id)
//         : [...wishlist, product];

//       await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });

//       toast.success(
//         exists
//           ? `${product.name} removed from wishlist`
//           : `${product.name} added to wishlist`
//       );
//     } catch (err) {
//       console.error("Error updating wishlist:", err);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!user || !user.isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     updateCart();
//   };

//   const handleBuyNow = async () => {
//     if (!user || !user.isAuthenticated) {
//       navigate("/login");
//       return;
//     }

//     const buyNowItem = { ...product, quantity: count, totalPrice };

//     try {
//       const res = await api.get(`/users/${user.id}`);
//       let orders = res.data.orders || [];
//       orders.push(buyNowItem);

//       await api.patch(`/users/${user.id}`, { orders });
//       navigate("/payment");
//     } catch (err) {
//       console.error("Error in Buy Now:", err);
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8">
//       <Toaster position="top-right" />
//       <button
//         onClick={onBack}
//         className="mb-4 text-red-500 hover:underline font-semibold"
//       >
//         ← Back to Products
//       </button>

//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="flex-1 flex justify-center items-center">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="object-contain h-80 w-full rounded"
//           />
//         </div>

//         <div className="flex-1 space-y-4">
//           <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
//           <p className="text-gray-500 text-sm italic">
//             {product.smallDescription ||
//               "This is a premium quality product designed for your needs."}
//           </p>
//           <p className="text-gray-600 text-lg">{product.description}</p>

//           <div className="flex items-center gap-4 mt-2">
//             <button
//               onClick={() => setCount((prev) => Math.max(1, prev - 1))}
//               className="bg-gray-300 px-4 py-2 rounded text-lg"
//             >
//               -
//             </button>
//             <span className="text-xl font-semibold">{count}</span>
//             <button
//               onClick={() => setCount((prev) => prev + 1)}
//               className="bg-gray-300 px-4 py-2 rounded text-lg"
//             >
//               +
//             </button>
//           </div>

//           <p className="text-2xl font-bold text-yellow-600 mt-2">
//             Total: ₹{totalPrice}
//           </p>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700 transition"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 bg-yellow-600 text-white py-3 rounded hover:bg-yellow-500 transition"
//             >
//               Buy Now
//             </button>
//             <button
//               onClick={() => {
//                 if (!user || !user.isAuthenticated) {
//                   navigate("/login");
//                   return;
//                 }
//                 toggleWishlist();
//               }}
//               className="bg-gray-300 text-gray-800 px-6 rounded hover:bg-gray-400 transition"
//             >
//               ♥
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
