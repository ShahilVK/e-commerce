import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Edit2, Search } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Products</h1>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Price</th>
              <th className="px-4 py-3 border">Image</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="bg-gray-50 hover:bg-gray-100 transition-all border-b rounded-lg"
                >
                  <td className="px-4 py-4 text-center">{p.id}</td>
                  <td className="px-4 py-4 font-medium text-gray-700">{p.name}</td>
                  <td className="px-4 py-4 text-gray-600">₹{Number(p.price || 0).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-md"
                    />
                  </td>
                  <td className="px-4 py-4 flex gap-3 justify-center">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                    <button
                      onClick={() => toast("Edit functionality coming soon!")}
                      className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
