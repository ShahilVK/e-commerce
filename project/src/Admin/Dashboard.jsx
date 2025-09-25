import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    smallDescription: "",
  });

  // Fetch products and users from DB
  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all product details!");
      return;
    }
    try {
      await api.post("/products", newProduct);
      toast.success("Product added!");
      setNewProduct({ name: "", price: "", image: "", smallDescription: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto p-6 mt-20 space-y-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

        {/* Add Product */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="border p-2 rounded col-span-1 md:col-span-2"
            />
            <input
              type="text"
              placeholder="Short Description"
              value={newProduct.smallDescription}
              onChange={(e) =>
                setNewProduct({ ...newProduct, smallDescription: e.target.value })
              }
              className="border p-2 rounded col-span-1 md:col-span-2"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition"
          >
            Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-2 border">{p.id}</td>
                    <td className="px-4 py-2 border">{p.name}</td>
                    <td className="px-4 py-2 border">{p.price}</td>
                    <td className="px-4 py-2 border">
                      <img src={p.image} alt={p.name} className="w-20 h-20 object-contain" />
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Cart Items</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-2 border">{u.id}</td>
                    <td className="px-4 py-2 border">{u.name}</td>
                    <td className="px-4 py-2 border">{u.email}</td>
                    <td className="px-4 py-2 border">{u.cart?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.userId}</td>
                    <td className="px-4 py-2 border">{order.total}</td>
                    <td className="px-4 py-2 border">{order.items?.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
