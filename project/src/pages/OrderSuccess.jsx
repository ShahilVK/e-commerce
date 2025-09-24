import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    if (lastOrder) {
      setOrder(lastOrder);
    }
  }, []);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No recent order found!</h2>
        <Link to="/" className="text-yellow-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        🎉 Order Successful!
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Thank you, <span className="font-semibold">{order.billing.name}</span>! <br />
        Your order has been placed successfully.
      </p>

      {/* Order Details */}
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
            </div>
            <span className="font-semibold text-gray-800">
              ₹{(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between mt-6 text-lg font-bold">
        <span>Total Paid:</span>
        <span>₹{order.total}</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <Link
          to="/"
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
