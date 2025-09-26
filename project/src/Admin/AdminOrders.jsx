import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      let allOrders = [];

      try {
        const res = await api.get("/orders");
        if (res.data && res.data.length > 0) {
          allOrders = res.data;
        }
      } catch {
        console.log("No global /orders, falling back to user.orders");
      }

      if (allOrders.length === 0) {
        const usersRes = await api.get("/users");
        usersRes.data.forEach((u) => {
          if (u.orders && Array.isArray(u.orders)) {
            allOrders = [
              ...allOrders,
              ...u.orders.map((o) => ({ ...o, userId: u.id })),
            ];
          }
        });
      }

      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      toast.success("Order deleted!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="flex">
      <Toaster position="top-right" />

      {/* Sidebar fixed */}
      <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Page content with margin-left */}
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders</h1>

        {/* Orders Table */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all flex-1">
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Items</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-100 transition-all">
                    <td className="px-4 py-2 border">{o.id}</td>
                    <td className="px-4 py-2 border">{o.userId}</td>
                    <td className="px-4 py-2 border">
                      ₹{Number(o.total || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        {(o.items || []).length}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDeleteOrder(o.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer inside content */}
        <Footer />
      </div>
    </div>
  );
}

export default AdminOrders;
