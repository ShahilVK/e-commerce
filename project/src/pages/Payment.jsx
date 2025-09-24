


















// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const Payment = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [billingInfo, setBillingInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);

//   // Load Buy Now or Cart items
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));

//     if (buyNowItem) {
//       // Merge Buy Now with cart if cart already has items
//       if (cart.length === 0) {
//         setCartItems([buyNowItem]);
//       } else {
//         setCartItems([...cart, buyNowItem]);
//       }
//     } else {
//       setCartItems(cart);
//     }
//   }, []);

//   // Calculate total
//   useEffect(() => {
//     const total = cartItems.reduce(
//       (acc, item) =>
//         acc + item.quantity * (parseFloat(item.price.replace(/[^\d.]/g, "")) || 0),
//       0
//     );
//     setTotalAmount((total - discount).toFixed(2));
//   }, [cartItems, discount]);

//   const updateQuantity = (id, value) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + value) }
//           : item
//       )
//     );
//   };

//   const handleInputChange = (e) => {
//     setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
//   };

//   const applyCoupon = () => {
//     if (coupon.toUpperCase() === "SAVE10") {
//       setDiscount(
//         cartItems.reduce(
//           (acc, item) => acc + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
//           0
//         ) * 0.1
//       );
//       toast.success("Coupon applied! 10% discount applied.");
//     } else {
//       toast.error("Invalid coupon code!");
//       setDiscount(0);
//     }
//   };

//   const handlePayment = () => {
//     const { name, email, phone, address } = billingInfo;
//     if (!name || !email || !phone || !address) {
//       toast.error("Please fill all billing details!");
//       return;
//     }
//     toast.success(
//       `Payment of ₹${totalAmount} successful via ${paymentMethod.toUpperCase()}`
//     );
//     localStorage.removeItem("buyNowItem");
//     localStorage.removeItem("cart");
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 mt-10">
//       <Toaster position="top-right" />
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Checkout</h2>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Billing & Payment */}
//         <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-6">
//           <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//             Billing Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={billingInfo.name}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={billingInfo.email}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={billingInfo.phone}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={billingInfo.address}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//             Payment Method
//           </h3>
//           <div className="flex flex-col gap-3">
//             {["card", "upi", "wallet"].map((method) => (
//               <label key={method} className="flex items-center gap-3 text-gray-700">
//                 <input
//                   type="radio"
//                   value={method}
//                   checked={paymentMethod === method}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="accent-yellow-500"
//                 />
//                 {method === "card"
//                   ? "Credit / Debit Card"
//                   : method.charAt(0).toUpperCase() + method.slice(1)}
//               </label>
//             ))}
//           </div>

//           <button
//             onClick={handlePayment}
//             className="w-full mt-4 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-md"
//           >
//             Pay ₹{totalAmount} Now
//           </button>
//         </div>

//         {/* Order Summary with Images */}
//         <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 space-y-6">
//           <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">Order Summary</h3>
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center border-b pb-3 last:border-b-0"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-contain rounded"
//                   />
//                   <div className="flex flex-col gap-1">
//                     <span className="font-semibold text-gray-800">{item.name}</span>
//                     <div className="flex items-center gap-2 mt-1">
//                       <button
//                         onClick={() => updateQuantity(item.id, -1)}
//                         className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
//                       >
//                         -
//                       </button>
//                       <span className="px-3">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, 1)}
//                         className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <span className="font-semibold text-gray-800">
//                   ₹{(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}
//                 </span>
//               </div>
//             ))}

//             {/* Coupon Code */}
//             <div className="flex gap-2 mt-4">
//               <input
//                 type="text"
//                 placeholder="Enter coupon code"
//                 value={coupon}
//                 onChange={(e) => setCoupon(e.target.value)}
//                 className="border border-gray-300 p-2 rounded flex-1"
//               />
//               <button
//                 onClick={applyCoupon}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Apply
//               </button>
//             </div>

//             {/* Price Breakdown */}
//             <div className="mt-4 border-t pt-4 space-y-2 text-gray-700">
//               <div className="flex justify-between">
//                 <span>Subtotal:</span>
//                 <span>
//                   ₹
//                   {cartItems.reduce(
//                     (acc, item) =>
//                       acc + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
//                     0
//                   )}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount:</span>
//                 <span>₹{discount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;












// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const Payment = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [billingInfo, setBillingInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);

//   // Load Cart + Buy Now
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));

//     if (buyNowItem) {
//       // Check if Buy Now item is already in cart
//       const existsInCart = cart.find((item) => item.id === buyNowItem.id);

//       if (existsInCart) {
//         const updatedCart = cart.map((item) =>
//           item.id === buyNowItem.id
//             ? { ...item, quantity: item.quantity + buyNowItem.quantity }
//             : item
//         );
//         setCartItems(updatedCart);
//       } else {
//         setCartItems([buyNowItem, ...cart]);
//       }
//     } else {
//       setCartItems(cart);
//     }
//   }, []);

//   // Calculate total
//   useEffect(() => {
//     const total = cartItems.reduce(
//       (acc, item) =>
//         acc + item.quantity * (parseFloat(item.price.replace(/[^\d.]/g, "")) || 0),
//       0
//     );
//     setTotalAmount((total - discount).toFixed(2));
//   }, [cartItems, discount]);

//   // Update quantity
//   const updateQuantity = (id, value) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + value) }
//           : item
//       )
//     );
//   };

//   // Handle billing info change
//   const handleInputChange = (e) => {
//     setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
//   };

//   // Apply coupon
//   const applyCoupon = () => {
//     if (coupon.toUpperCase() === "SAVE10") {
//       const newDiscount =
//         cartItems.reduce(
//           (acc, item) => acc + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
//           0
//         ) * 0.1;
//       setDiscount(newDiscount);
//       toast.success("Coupon applied! 10% discount applied.");
//     } else {
//       toast.error("Invalid coupon code!");
//       setDiscount(0);
//     }
//   };

//   // Handle payment
//   const handlePayment = () => {
//     const { name, email, phone, address } = billingInfo;
//     if (!name || !email || !phone || !address) {
//       toast.error("Please fill all billing details!");
//       return;
//     }

//     toast.success(
//       `Payment of ₹${totalAmount} successful via ${paymentMethod.toUpperCase()}`
//     );

//     // Clear cart & Buy Now after payment
//     localStorage.removeItem("buyNowItem");
//     localStorage.removeItem("cart");
//     setCartItems([]);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 mt-10">
//       <Toaster position="top-right" />
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Checkout</h2>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Billing & Payment */}
//         <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-6">
//           <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//             Billing Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={billingInfo.name}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={billingInfo.email}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={billingInfo.phone}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={billingInfo.address}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
//             Payment Method
//           </h3>
//           <div className="flex flex-col gap-3">
//             {["card", "upi", "wallet"].map((method) => (
//               <label key={method} className="flex items-center gap-3 text-gray-700">
//                 <input
//                   type="radio"
//                   value={method}
//                   checked={paymentMethod === method}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="accent-yellow-500"
//                 />
//                 {method === "card"
//                   ? "Credit / Debit Card"
//                   : method.charAt(0).toUpperCase() + method.slice(1)}
//               </label>
//             ))}
//           </div>

//           <button
//             onClick={handlePayment}
//             className="w-full mt-4 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-md"
//           >
//             Pay ₹{totalAmount} Now
//           </button>
//         </div>

//         {/* Order Summary */}
//         <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 space-y-6">
//           <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">Order Summary</h3>
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center border-b pb-3 last:border-b-0"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-contain rounded"
//                   />
//                   <div className="flex flex-col gap-1">
//                     <span className="font-semibold text-gray-800">{item.name}</span>
//                     <div className="flex items-center gap-2 mt-1">
//                       <button
//                         onClick={() => updateQuantity(item.id, -1)}
//                         className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
//                       >
//                         -
//                       </button>
//                       <span className="px-3">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, 1)}
//                         className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <span className="font-semibold text-gray-800">
//                   ₹{(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}
//                 </span>
//               </div>
//             ))}

//             {/* Coupon */}
//             <div className="flex gap-2 mt-4">
//               <input
//                 type="text"
//                 placeholder="Enter coupon code"
//                 value={coupon}
//                 onChange={(e) => setCoupon(e.target.value)}
//                 className="border border-gray-300 p-2 rounded flex-1"
//               />
//               <button
//                 onClick={applyCoupon}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Apply
//               </button>
//             </div>

//             {/* Price Breakdown */}
//             <div className="mt-4 border-t pt-4 space-y-2 text-gray-700">
//               <div className="flex justify-between">
//                 <span>Subtotal:</span>
//                 <span>
//                   ₹
//                   {cartItems.reduce(
//                     (acc, item) =>
//                       acc + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
//                     0
//                   ).toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount:</span>
//                 <span>₹{discount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;


















import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [totalAmount, setTotalAmount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  // Load Cart + Buy Now
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));

    if (buyNowItem) {
      const existsInCart = cart.find((item) => item.id === buyNowItem.id);

      if (existsInCart) {
        const updatedCart = cart.map((item) =>
          item.id === buyNowItem.id
            ? { ...item, quantity: item.quantity + buyNowItem.quantity }
            : item
        );
        setCartItems(updatedCart);
      } else {
        setCartItems([buyNowItem, ...cart]);
      }
    } else {
      setCartItems(cart);
    }
  }, []);

  // Calculate total
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) =>
        acc + item.quantity * (parseFloat(item.price.replace(/[^\d.]/g, "")) || 0),
      0
    );
    setTotalAmount((total - discount).toFixed(2));
  }, [cartItems, discount]);

  // Update quantity
  const updateQuantity = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + value) }
          : item
      )
    );
  };

  // Handle billing info change
  const handleInputChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      const newDiscount =
        cartItems.reduce(
          (acc, item) => acc + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
          0
        ) * 0.1;
      setDiscount(newDiscount);
      toast.success("Coupon applied! 10% discount applied.");
    } else {
      toast.error("Invalid coupon code!");
      setDiscount(0);
    }
  };

  // Handle payment
  const handlePayment = () => {
    const { name, email, phone, address } = billingInfo;
    if (!name || !email || !phone || !address) {
      toast.error("Please fill all billing details!");
      return;
    }

    toast.success(
      `Payment of ₹${totalAmount} successful via ${paymentMethod.toUpperCase()}`
    );

    // Save order details to localStorage for OrderSuccess page
    const orderData = {
      items: cartItems,
      total: totalAmount,
      billing: billingInfo,
      paymentMethod,
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Clear cart & Buy Now
    localStorage.removeItem("buyNowItem");
    localStorage.removeItem("cart");
    setCartItems([]);

    // Redirect after short delay
    setTimeout(() => {
      navigate("/ordersuccess");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Checkout</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Billing & Payment */}
        <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
            Billing Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={billingInfo.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={billingInfo.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={billingInfo.phone}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={billingInfo.address}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">
            Payment Method
          </h3>
          <div className="flex flex-col gap-3">
            {["card", "upi", "wallet"].map((method) => (
              <label key={method} className="flex items-center gap-3 text-gray-700">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-yellow-500"
                />
                {method === "card"
                  ? "Credit / Debit Card"
                  : method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
            ))}
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-4 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-md"
          >
            Pay ₹{totalAmount} Now
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h3 className="text-2xl font-semibold border-b pb-2 text-gray-700">Order Summary</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">
                  ₹{(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}
                </span>
              </div>
            ))}

            {/* Coupon */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <button
                onClick={applyCoupon}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="mt-4 border-t pt-4 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  ₹
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
