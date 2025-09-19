

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Payment() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orderItem, setOrderItem] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Get Buy Now item
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

  // Apply simple discount
  const applyDiscount = (code) => {
    if (code === "SAVE10") {
      setDiscount(0.1); // 10%
      toast.success("Coupon Applied! 10% OFF");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const amount = (orderItem.totalPrice * (1 - discount)).toFixed(2) * 100; // in paise

    const options = {
      key: "rzp_test_yourkeyhere", // replace with Razorpay Key
      amount: amount,
      currency: "INR",
      name: "Mobile Accessories Store",
      description: "Payment for your order",
      image: "https://yourlogo.com/logo.png", // optional
      handler: function (response) {
        toast.success("Payment Successful!");
        console.log("Payment ID:", response.razorpay_payment_id);

        // ✅ Save order to localStorage (or API)
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const newOrder = {
          ...orderItem,
          paymentId: response.razorpay_payment_id,
          status: "Paid",
          date: new Date().toLocaleString(),
        };
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        // ✅ Clear Buy Now item
        localStorage.removeItem("buyNowItem");

        navigate("/"); // redirect home or to "My Orders"
      },
      prefill: {
        name: user?.username || "Customer",
        email: user?.email || "customer@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!orderItem) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      {/* Order Summary */}
      <div className="border p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        <p>Product: {orderItem.name}</p>
        <p>Quantity: {orderItem.quantity}</p>
        <p>Price: ₹{orderItem.totalPrice}</p>
        {discount > 0 && (
          <p className="text-green-600 font-bold">
            Discount Applied: -{discount * 100}%
          </p>
        )}
        <p className="font-bold text-lg">
          Final Amount: ₹{(orderItem.totalPrice * (1 - discount)).toFixed(2)}
        </p>
      </div>

      {/* Coupon */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="border px-4 py-2 rounded mr-2"
          id="coupon"
        />
        <button
          onClick={() =>
            applyDiscount(document.getElementById("coupon").value)
          }
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* Pay Now */}
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-500 transition"
      >
        Pay with Razorpay
      </button>
    </div>
  );
}

export default Payment;
