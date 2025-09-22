

// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// function Payment() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [orderItem, setOrderItem] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   useEffect(() => {
//     // Get Buy Now item
//     const stored = localStorage.getItem("buyNowItem");
//     if (stored) {
//       setOrderItem(JSON.parse(stored));
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   // Load Razorpay Script
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Apply simple discount
//   const applyDiscount = (code) => {
//     if (code === "SAVE10") {
//       setDiscount(0.1); // 10%
//       toast.success("Coupon Applied! 10% OFF");
//     } else {
//       toast.error("Invalid Coupon Code");
//     }
//   };

//   const handlePayment = async () => {
//     const res = await loadRazorpay();
//     if (!res) {
//       alert("Razorpay SDK failed to load");
//       return;
//     }

//     const amount = (orderItem.totalPrice * (1 - discount)).toFixed(2) * 100; // in paise

//     const options = {
//       key: "rzp_test_yourkeyhere", // replace with Razorpay Key
//       amount: amount,
//       currency: "INR",
//       name: "Mobile Accessories Store",
//       description: "Payment for your order",
//       image: "https://yourlogo.com/logo.png", // optional
//       handler: function (response) {
//         toast.success("Payment Successful!");
//         console.log("Payment ID:", response.razorpay_payment_id);

//         // ✅ Save order to localStorage (or API)
//         const orders = JSON.parse(localStorage.getItem("orders")) || [];
//         const newOrder = {
//           ...orderItem,
//           paymentId: response.razorpay_payment_id,
//           status: "Paid",
//           date: new Date().toLocaleString(),
//         };
//         orders.push(newOrder);
//         localStorage.setItem("orders", JSON.stringify(orders));

//         // ✅ Clear Buy Now item
//         localStorage.removeItem("buyNowItem");

//         navigate("/"); // redirect home or to "My Orders"
//       },
//       prefill: {
//         name: user?.username || "Customer",
//         email: user?.email || "customer@example.com",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   if (!orderItem) return null;

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
//       <h2 className="text-2xl font-bold mb-4">Payment</h2>

//       {/* Order Summary */}
//       <div className="border p-4 rounded mb-6">
//         <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
//         <p>Product: {orderItem.name}</p>
//         <p>Quantity: {orderItem.quantity}</p>
//         <p>Price: ₹{orderItem.totalPrice}</p>
//         {discount > 0 && (
//           <p className="text-green-600 font-bold">
//             Discount Applied: -{discount * 100}%
//           </p>
//         )}
//         <p className="font-bold text-lg">
//           Final Amount: ₹{(orderItem.totalPrice * (1 - discount)).toFixed(2)}
//         </p>
//       </div>

//       {/* Coupon */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Enter Coupon Code"
//           className="border px-4 py-2 rounded mr-2"
//           id="coupon"
//         />
//         <button
//           onClick={() =>
//             applyDiscount(document.getElementById("coupon").value)
//           }
//           className="bg-yellow-600 text-white px-4 py-2 rounded"
//         >
//           Apply
//         </button>
//       </div>

//       {/* Pay Now */}
//       <button
//         onClick={handlePayment}
//         className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-500 transition"
//       >
//         Pay with Razorpay
//       </button>
//     </div>
//   );
// }

// export default Payment;










import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Payment() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orderItem, setOrderItem] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState(1); // stepper: 1 = Order, 2 = Coupon, 3 = Payment

  useEffect(() => {
    const stored = localStorage.getItem("buyNowItem");
    if (stored) {
      setOrderItem(JSON.parse(stored));
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Apply Discount
  const applyDiscount = (code) => {
    if (code === "SAVE10") {
      setDiscount(0.1);
      toast.success("Coupon Applied! 10% OFF");
      setStep(3); // move to payment
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  // Razorpay Payment
  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const amount = (orderItem.totalPrice * (1 - discount)).toFixed(2) * 100;

    const options = {
      key: "rzp_test_yourkeyhere",
      amount: amount,
      currency: "INR",
      name: "Mobile Accessories Store",
      description: "Payment for your order",
      handler: function (response) {
        toast.success("Payment Successful!");

        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const newOrder = {
          ...orderItem,
          paymentId: response.razorpay_payment_id,
          status: "Paid",
          date: new Date().toLocaleString(),
        };
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("buyNowItem");

        navigate("/"); 
      },
      prefill: {
        name: user?.username || "Customer",
        email: user?.email || "customer@example.com",
      },
      theme: {
        color: "#ef4444", // red theme
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!orderItem) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 mt-10">
      {/* Stepper Header */}
      <div className="flex justify-between mb-8">
        {["Order", "Coupon", "Payment"].map((label, index) => (
          <div
            key={label}
            className={`flex-1 text-center pb-2 border-b-4 ${
              step === index + 1
                ? "border-red-600 font-bold text-red-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step 1: Order Summary */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="border p-4 rounded mb-6 bg-gray-50">
            <p>
              <span className="font-semibold">Product:</span> {orderItem.name}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {orderItem.quantity}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ₹
              {orderItem.totalPrice}
            </p>
            <p className="text-lg font-bold mt-2">
              Total: ₹{orderItem.totalPrice}
            </p>
          </div>
          <button
            onClick={() => setStep(2)}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 transition"
          >
            Next: Apply Coupon →
          </button>
        </div>
      )}

      {/* Step 2: Coupon */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Apply Coupon</h2>
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              id="coupon"
              className="flex-1 border px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={() =>
                applyDiscount(document.getElementById("coupon").value)
              }
              className="bg-yellow-600 text-white px-4 py-2 rounded-r hover:bg-yellow-500 transition"
            >
              Apply
            </button>
          </div>
          <button
            onClick={() => setStep(3)}
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-400 transition"
          >
            Skip Coupon →
          </button>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
          <div className="border p-4 rounded mb-6 bg-gray-50">
            {discount > 0 && (
              <p className="text-green-600 font-bold mb-2">
                Discount Applied: -{discount * 100}%
              </p>
            )}
            <p className="text-lg font-bold">
              Final Amount: ₹
              {(orderItem.totalPrice * (1 - discount)).toFixed(2)}
            </p>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition"
          >
            Pay with Razorpay
          </button>
        </div>
      )}
    </div>
  );
}

export default Payment;
