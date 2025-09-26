import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Edit2, Search, X, Plus } from "lucide-react";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

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

  // Open Edit Modal
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewPrice(product.price);
  };

  // Update Product Price
  const handleUpdatePrice = async () => {
    if (!newPrice) return toast.error("Price cannot be empty");
    try {
      await api.patch(`/products/${editingProduct.id}`, {
        price: Number(newPrice),
      });
      toast.success("Price updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update price");
    }
  };

  // Open Add Product Modal
  const handleAddProductOpen = () => {
    setIsAddModalOpen(true);
    setNewProduct({ name: "", price: "", image: "" });
  };

  // Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return toast.error("All fields are required");
    }
    try {
      await api.post("/products", {
        ...newProduct,
        price: Number(newProduct.price),
      });
      toast.success("Product added successfully!");
      setIsAddModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 overflow-y-auto bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Products</h1>
            <button
              onClick={handleAddProductOpen}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>

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
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 font-medium"
                    >
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
                      <td className="px-4 py-4 font-medium text-gray-700">
                        {p.name}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        ₹{Number(p.price || 0).toFixed(2)}
                      </td>
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
                          onClick={() => handleEditProduct(p)}
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

        {/* Footer */}
        <Footer />
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setEditingProduct(null)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              Edit Price - {editingProduct.name}
            </h2>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              onClick={handleUpdatePrice}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
            >
              Update Price
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsAddModalOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
            >
              Add Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
