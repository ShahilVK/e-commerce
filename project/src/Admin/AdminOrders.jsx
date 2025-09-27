// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
// import toast, { Toaster } from "react-hot-toast";

// function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Fetch Orders
//   const fetchOrders = async () => {
//     try {
//       let allOrders = [];

//       try {
//         const res = await api.get("/orders");
//         if (res.data && res.data.length > 0) {
//           allOrders = res.data;
//         }
//       } catch {
//         console.log("No global /orders, falling back to user.orders");
//       }

//       if (allOrders.length === 0) {
//         const usersRes = await api.get("/users");
//         usersRes.data.forEach((u) => {
//           if (u.orders && Array.isArray(u.orders)) {
//             allOrders = [
//               ...allOrders,
//               ...u.orders.map((o) => ({ ...o, userId: u.id })),
//             ];
//           }
//         });
//       }

//       setOrders(allOrders);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     }
//   };

//   // Delete Order
//   const handleDeleteOrder = async (id) => {
//     try {
//       await api.delete(`/orders/${id}`);
//       toast.success("Order deleted!");
//       fetchOrders();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete order");
//     }
//   };

//   return (
//     <div className="flex">
//       <Toaster position="top-right" />

//       {/* Sidebar fixed */}
//       <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
//         <Sidebar />
//       </div>

//       {/* Page content with margin-left */}
//       <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen flex flex-col">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders</h1>

//         {/* Orders Table */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all flex-1">
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded-lg overflow-hidden">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-4 py-2 border">Order ID</th>
//                   <th className="px-4 py-2 border">User ID</th>
//                   <th className="px-4 py-2 border">Total</th>
//                   <th className="px-4 py-2 border">Items</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((o) => (
//                   <tr key={o.id} className="hover:bg-gray-100 transition-all">
//                     <td className="px-4 py-2 border">{o.id}</td>
//                     <td className="px-4 py-2 border">{o.userId}</td>
//                     <td className="px-4 py-2 border">
//                       ₹{Number(o.total || 0).toFixed(2)}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
//                         {(o.items || []).length}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <button
//                         onClick={() => handleDeleteOrder(o.id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {orders.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4 text-gray-500">
//                       No orders found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer inside content */}
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default AdminOrders;





import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { 
    Trash2, Search, X, Package, ChevronLeft, ChevronRight, 
    Home, Box, ShoppingCart, Users, Settings, LogOut, FileText
} from "lucide-react";

// --- Self-contained API and Helper Components ---

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
       <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
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

// --- Main AdminOrders Component ---
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const usersRes = await api.get("/users");
      let allOrders = [];
      (usersRes.data || []).forEach((user) => {
        if (user.orders && Array.isArray(user.orders)) {
          const userOrders = user.orders.map((order) => ({
            ...order,
            userId: user.id,
            customerName: user.name,
            customerEmail: user.email,
          }));
          allOrders.push(...userOrders);
        }
      });
      allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, userId, newStatus) => {
    const loadingToast = toast.loading("Updating status...");
    try {
      const userRes = await api.get(`/users/${userId}`);
      const user = userRes.data;
      
      const updatedOrders = user.orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      await api.patch(`/users/${userId}`, { orders: updatedOrders });
      toast.success("Order status updated!", { id: loadingToast });
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status.", { id: loadingToast });
      console.error(err);
    }
  };

  const handleDeleteRequest = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = async () => {
    if (!orderToDelete) return;
    try {
        const { id: orderId, userId } = orderToDelete;
        const userRes = await api.get(`/users/${userId}`);
        const user = userRes.data;
        
        const updatedOrders = user.orders.filter(order => order.id !== orderId);
        
        await api.patch(`/users/${userId}`, { orders: updatedOrders });
        toast.success(`Order #${orderId} deleted successfully!`);
        fetchOrders();
    } catch (err) {
        toast.error("Failed to delete order.");
        console.error(err);
    } finally {
        setShowDeleteConfirm(false);
        setOrderToDelete(null);
    }
  };
  
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const { currentOrders, totalPages } = useMemo(() => {
    const filtered = orders.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
    );
    const pages = Math.ceil(filtered.length / ordersPerPage);
    const paginated = filtered.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
    return { currentOrders: paginated, totalPages: pages };
  }, [orders, search, currentPage, ordersPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Shipped': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Canceled': return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const renderSkeletonLoader = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
                <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
        ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" />
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Orders</h1>
          <div className="relative mb-6 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
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
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Order Details</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Customer</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Total</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                           <ShoppingCart size={40}/>
                           <span className="font-medium">No orders found.</span>
                           {search && <span className="text-sm">Try adjusting your search.</span>}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((o) => (
                      <tr key={o.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="p-3">
                           <p className="font-bold text-gray-800 dark:text-gray-100">#{o.id}</p>
                           <p className="text-xs text-gray-500">{new Date(o.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </td>
                        <td className="p-3">
                           <p className="font-medium text-gray-800 dark:text-gray-200">{o.customerName}</p>
                           <p className="text-xs text-gray-500">{o.customerEmail}</p>
                        </td>
                        <td className="p-3 font-medium text-gray-700 dark:text-gray-300">₹{Number(o.total || 0).toFixed(2)}</td>
                        <td className="p-3">
                          <select 
                            value={o.status} 
                            onChange={(e) => handleUpdateStatus(o.id, o.userId, e.target.value)}
                            className={`px-2 py-1 text-xs font-semibold rounded-full border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getStatusBadge(o.status)}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                              <button onClick={() => handleViewDetails(o)} className="p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition"><FileText size={16} /></button>
                              <button onClick={() => handleDeleteRequest(o)} className="p-2 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
               {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">
                        <ChevronLeft size={16}/> Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">
                        Next <ChevronRight size={16}/>
                    </button>
                </div>
               )}
            </div>
           )}
        </main>
        <Footer />
      </div>

      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
        {selectedOrder && (
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h3>
                        <p className="text-sm text-gray-500">Order #{selectedOrder.id}</p>
                    </div>
                    <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <div className="mt-4 border-t border-b border-gray-200 dark:border-gray-700 py-4 grid grid-cols-2 gap-4 text-sm">
                     <div>
                        <p className="font-semibold text-gray-600 dark:text-gray-300">Customer</p>
                        <p className="text-gray-800 dark:text-gray-100">{selectedOrder.customerName}</p>
                        <p className="text-gray-500">{selectedOrder.customerEmail}</p>
                     </div>
                     <div>
                        <p className="font-semibold text-gray-600 dark:text-gray-300">Billing Info</p>
                        <p className="text-gray-800 dark:text-gray-100">{selectedOrder.billing?.name || selectedOrder.customerName}</p>
                        <p className="text-gray-500">{selectedOrder.billing?.address || 'N/A'}</p>
                     </div>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Items Ordered</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {selectedOrder.items?.map((item, index) => (
                            <div key={item.id + index} className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover shadow-sm"/>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">₹{Number(String(item.price).replace(/[^\d.]/g, '') * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center font-bold text-lg">
                    <span className="text-gray-600 dark:text-gray-300">Order Total</span>
                    <span className="text-gray-900 dark:text-white">₹{Number(selectedOrder.total).toFixed(2)}</span>
                </div>
            </div>
        )}
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <div className="p-6">
            <div className="text-center">
                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                     <Trash2 className="h-6 w-6 text-red-600" />
                 </div>
                 <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Delete Order</h3>
                 <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                     <p>Are you sure you want to delete order</p>
                     <p className="font-semibold text-gray-700 dark:text-gray-200">#{orderToDelete?.id}?</p>
                     <p>This action cannot be undone.</p>
                 </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
                 <button type="button" onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                 <button type="button" onClick={confirmDeleteOrder} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
            </div>
        </div>
      </Modal>
    </div>
  );
}

const App = () => (
    <AdminOrders />
);

export default App;

