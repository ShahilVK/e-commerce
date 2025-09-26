import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      if (res.data) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all flex-1">
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Orders</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-100 transition-all">
                    <td className="px-4 py-2 border">{u.id}</td>
                    <td className="px-4 py-2 border">{u.name}</td>
                    <td className="px-4 py-2 border">{u.email}</td>
                    <td className="px-4 py-2 border">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {(u.orders || []).length}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found
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

export default AdminUsers;
