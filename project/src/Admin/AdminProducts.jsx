// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import toast, { Toaster } from "react-hot-toast";
// import { Trash2, Edit2, Search, X, Plus } from "lucide-react";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [newPrice, setNewPrice] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: "",
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch products");
//     }
//   };

//   // Delete Product
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product deleted successfully!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete product");
//     }
//   };

//   // Open Edit Modal
//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setNewPrice(product.price);
//   };

//   // Update Product Price
//   const handleUpdatePrice = async () => {
//     if (!newPrice) return toast.error("Price cannot be empty");
//     try {
//       await api.patch(`/products/${editingProduct.id}`, {
//         price: Number(newPrice),
//       });
//       toast.success("Price updated successfully!");
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update price");
//     }
//   };

//   // Open Add Product Modal
//   const handleAddProductOpen = () => {
//     setIsAddModalOpen(true);
//     setNewProduct({ name: "", price: "", image: "" });
//   };

//   // Add Product
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       return toast.error("All fields are required");
//     }
//     try {
//       await api.post("/products", {
//         ...newProduct,
//         price: Number(newProduct.price),
//       });
//       toast.success("Product added successfully!");
//       setIsAddModalOpen(false);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add product");
//     }
//   };

//   // Filter products by search
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen">
//       <Toaster position="top-right" />

//       {/* Sidebar */}
//       <div className="w-64 h-screen sticky top-0 overflow-y-auto bg-white shadow-md">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Admin Products</h1>
//             <button
//               onClick={handleAddProductOpen}
//               className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
//             >
//               <Plus size={18} /> Add Product
//             </button>
//           </div>

//           {/* Search */}
//           <div className="mb-6 flex items-center gap-2">
//             <Search className="text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>

//           {/* Products Table */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//                 <tr>
//                   <th className="px-4 py-3 border">ID</th>
//                   <th className="px-4 py-3 border">Name</th>
//                   <th className="px-4 py-3 border">Price</th>
//                   <th className="px-4 py-3 border">Image</th>
//                   <th className="px-4 py-3 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="text-center py-6 text-gray-500 font-medium"
//                     >
//                       No products found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredProducts.map((p) => (
//                     <tr
//                       key={p.id}
//                       className="bg-gray-50 hover:bg-gray-100 transition-all border-b rounded-lg"
//                     >
//                       <td className="px-4 py-4 text-center">{p.id}</td>
//                       <td className="px-4 py-4 font-medium text-gray-700">
//                         {p.name}
//                       </td>
//                       <td className="px-4 py-4 text-gray-600">
//                         ₹{Number(p.price || 0).toFixed(2)}
//                       </td>
//                       <td className="px-4 py-4">
//                         <img
//                           src={p.image}
//                           alt={p.name}
//                           className="w-24 h-24 object-cover rounded-xl shadow-md"
//                         />
//                       </td>
//                       <td className="px-4 py-4 flex gap-3 justify-center">
//                         <button
//                           onClick={() => handleDeleteProduct(p.id)}
//                           className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
//                         >
//                           <Trash2 size={16} /> Delete
//                         </button>
//                         <button
//                           onClick={() => handleEditProduct(p)}
//                           className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
//                         >
//                           <Edit2 size={16} /> Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>

//       {/* Edit Modal */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative">
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//               onClick={() => setEditingProduct(null)}
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">
//               Edit Price - {editingProduct.name}
//             </h2>
//             <input
//               type="number"
//               value={newPrice}
//               onChange={(e) => setNewPrice(e.target.value)}
//               className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//             <button
//               onClick={handleUpdatePrice}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
//             >
//               Update Price
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add Modal */}
//       {isAddModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative">
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//               onClick={() => setIsAddModalOpen(false)}
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Add New Product</h2>
//             <input
//               type="text"
//               placeholder="Product Name"
//               value={newProduct.name}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, name: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newProduct.price}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, price: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={newProduct.image}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, image: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleAddProduct}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
//             >
//               Add Product
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProducts;







import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { 
    Trash2, Edit2, Search, X, Plus, Package, ChevronLeft, ChevronRight, 
    Home, Box, ShoppingCart, Users, Settings, LogOut 
} from "lucide-react";

// --- Self-contained API and Helper Components ---

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
       <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
               {children}
           </div>
       </div>
    );
};

const Footer = () => (
    <footer className="bg-white dark:bg-gray-800 p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 mt-auto">
      © {new Date().getFullYear()} TekTrov. All rights reserved.
    </footer>
);

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const menuItems = [
      { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
      { name: "Products", icon: <Box size={18} />, path: "/adminproducts" },
      { name: "Orders", icon: <ShoppingCart size={18} />, path: "/adminorders" },
      { name: "Users", icon: <Users size={18} />, path: "/adminusers" },
      { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/settings" },
    ];
    const handleLogout = () => {
      // Basic logout, in a real app this would be more robust
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logged out successfully.");
    };
    return (
      <div className="w-64 h-screen bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} className={`flex items-center px-6 py-3 transition-colors ${location.pathname.startsWith(item.path) ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center w-full text-left hover:bg-gray-800 px-4 py-2 rounded">
            <LogOut size={18} className="mr-3" /> Logout
          </button>
        </div>
      </div>
    );
};

// --- Main AdminProducts Component ---
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({ name: "", price: "", image: "", category: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const parsePrice = (price) => parseFloat(String(price).replace(/[^\d.]/g, '')) || 0;
  const formatPrice = (price) => `₹${Number(price).toFixed(2)}`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRequest = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/products/${productToDelete.id}`);
      toast.success(`Product "${productToDelete.name}" deleted successfully!`);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct({ ...product, price: parsePrice(product.price) });
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.price || !editingProduct.name) return toast.error("Name and Price are required.");
    try {
      await api.patch(`/products/${editingProduct.id}`, {
        price: formatPrice(editingProduct.price),
        name: editingProduct.name,
        category: editingProduct.category,
        image: editingProduct.image,
      });
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const handleOpenAddModal = () => {
    setNewProductData({ name: "", price: "", image: "", category: "" });
    setIsAddModalOpen(true);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, price, image, category } = newProductData;
    if (!name || !price || !image || !category) return toast.error("All fields are required");
    try {
      await api.post("/products", { ...newProductData, price: formatPrice(price) });
      toast.success("Product added successfully!");
      setIsAddModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  const { currentProducts, totalPages } = useMemo(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    const pages = Math.ceil(filtered.length / productsPerPage);
    const paginated = filtered.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
    return { currentProducts: paginated, totalPages: pages };
  }, [products, search, currentPage, productsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderSkeletonLoader = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
       <div className="space-y-4 animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
       </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" containerClassName="text-sm"/>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Products</h1>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all active:scale-95"
            >
              <Plus size={20} /> Add Product
            </button>
          </div>

          <div className="relative mb-6 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full p-2.5 pl-10 pr-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={18}/></button>}
          </div>
            
          {isLoading ? renderSkeletonLoader() : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Product</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Price</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Category</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                           <Package size={40}/>
                           <span className="font-medium">No products found.</span>
                           {search && <span className="text-sm">Try adjusting your search.</span>}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-md shadow-sm" />
                            <span className="font-bold text-gray-800 dark:text-gray-100">{p.name}</span>
                          </div>
                        </td>
                        <td className="p-3 font-medium text-gray-700 dark:text-gray-300">{formatPrice(parsePrice(p.price))}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-400">{p.category}</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleOpenEditModal(p)} className="p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition active:scale-90"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteRequest(p)} className="p-2 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition active:scale-90"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
               {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft size={16}/> Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next <ChevronRight size={16}/>
                    </button>
                </div>
               )}
            </div>
           )}
        </main>
        <Footer />
      </div>

      <Modal isOpen={isAddModalOpen || !!editingProduct} onClose={() => { setIsAddModalOpen(false); setEditingProduct(null); }}>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="p-6">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"><X size={24} /></button>
              </div>
              <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label><input type="text" name="name" value={editingProduct ? editingProduct.name : newProductData.name} onChange={editingProduct ? handleEditInputChange : handleAddInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required/></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (₹)</label><input type="number" name="price" value={editingProduct ? editingProduct.price : newProductData.price} onChange={editingProduct ? handleEditInputChange : handleAddInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required step="0.01"/></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label><input type="text" name="category" value={editingProduct ? editingProduct.category : newProductData.category} onChange={editingProduct ? handleEditInputChange : handleAddInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required/></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label><input type="text" name="image" value={editingProduct ? editingProduct.image : newProductData.image} onChange={editingProduct ? handleEditInputChange : handleAddInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required/></div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-100 text-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                  <button type="submit" className={`px-4 py-2 text-white rounded-md ${editingProduct ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>{editingProduct ? 'Save Changes' : 'Add Product'}</button>
              </div>
          </form>
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <div className="p-6">
            <div className="text-center">
                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                     <Trash2 className="h-6 w-6 text-red-600" />
                 </div>
                 <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Delete Product</h3>
                 <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                     <p>Are you sure you want to delete</p>
                     <p className="font-semibold text-gray-700 dark:text-gray-200">"{productToDelete?.name}"?</p>
                     <p>This action cannot be undone.</p>
                 </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
                 <button type="button" onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                 <button type="button" onClick={confirmDeleteProduct} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

// The App component is added to ensure routing context is available for Sidebar's <Link> components
const App = () => {
    return (
        // In a real app, you would have your full routing structure here
        // For this self-contained example, we just render the component
        <AdminProducts />
    );
};


export default App;

