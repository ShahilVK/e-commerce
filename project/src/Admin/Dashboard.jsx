
// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
// import toast, { Toaster } from "react-hot-toast";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: []
//   });

//   useEffect(() => {
//     fetchUsers();
//     fetchOrders();
//   }, []);

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

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
//         console.log("No global /orders, using user.orders");
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
//       processChartData(allOrders);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Process chart data
//   const processChartData = (ordersData) => {
//     // Group orders by date (assuming orders have a date field)
//     const revenueByDate = {};
    
//     ordersData.forEach(order => {
//       // Use order date if available, otherwise use current date as fallback
//       const date = order.date ? new Date(order.date).toLocaleDateString() : new Date().toLocaleDateString();
//       if (!revenueByDate[date]) {
//         revenueByDate[date] = 0;
//       }
//       revenueByDate[date] += Number(order.total || 0);
//     });

//     // Sort dates and prepare chart data
//     const sortedDates = Object.keys(revenueByDate).sort((a, b) => new Date(a) - new Date(b));
//     const revenueValues = sortedDates.map(date => revenueByDate[date]);

//     setChartData({
//       labels: sortedDates,
//       datasets: [
//         {
//           label: 'Daily Revenue',
//           data: revenueValues,
//           borderColor: 'rgb(75, 192, 192)',
//           backgroundColor: 'rgba(75, 192, 192, 0.5)',
//           tension: 0.3,
//         },
//       ],
//     });
//   };

//   // --- Stats ---
//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + Number(order.total || 0),
//     0
//   );
//   const totalOrders = orders.length;
//   const totalUsers = users.length;

//   return (
//     <div className="flex">
//       <Toaster position="top-right" />

//       {/* Sidebar Fixed */}
//       <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen overflow-y-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Admin Dashboard
//         </h1>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <StatCard
//             title="Total Revenue"
//             value={`₹${totalRevenue.toFixed(2)}`}
//             color="green"
//           />
//           <StatCard title="Total Orders" value={totalOrders} color="blue" />
//           <StatCard title="Total Users" value={totalUsers} color="purple" />
//         </div>

//         {/* Revenue Chart */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">Revenue Overview</h2>
//           <div className="h-80">
//             <Line 
//               data={chartData} 
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   title: {
//                     display: true,
//                     text: 'Daily Revenue Trend',
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     ticks: {
//                       callback: function(value) {
//                         return '₹' + value;
//                       }
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>

//         {/* Tables */}
//         <UsersTable users={users} />
//         <OrdersTable orders={orders} />

//         {/* Footer */}
//         <Footer />
//       </div>
//     </div>
//   );
// }

// // --- Reusable Components ---
// const StatCard = ({ title, value, color }) => (
//   <div
//     className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center`}
//   >
//     <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
//     <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
//   </div>
// );

// const UsersTable = ({ users }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
//     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
//     <div className="overflow-x-auto">
//       <table className="min-w-full border rounded-lg overflow-hidden">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Orders</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id} className="hover:bg-gray-100 transition-all">
//               <td className="px-4 py-2 border">{u.id}</td>
//               <td className="px-4 py-2 border">{u.name}</td>
//               <td className="px-4 py-2 border">{u.email}</td>
//               <td className="px-4 py-2 border">
//                 <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
//                   {u.orders?.length || 0}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// const OrdersTable = ({ orders }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
//     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
//     <div className="overflow-x-auto">
//       <table className="min-w-full border rounded-lg overflow-hidden">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 border">Order ID</th>
//             <th className="px-4 py-2 border">User ID</th>
//             <th className="px-4 py-2 border">Total</th>
//             <th className="px-4 py-2 border">Items</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((o) => (
//             <tr key={o.id} className="hover:bg-gray-100 transition-all">
//               <td className="px-4 py-2 border">{o.id}</td>
//               <td className="px-4 py-2 border">{o.userId}</td>
//               <td className="px-4 py-2 border">
//                 ₹{Number(o.total || 0).toFixed(2)}
//               </td>
//               <td className="px-4 py-2 border">
//                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
//                   {(o.items || []).length}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// export default Dashboard;









// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import {
//   DollarSign,
//   ShoppingCart,
//   Users,
// } from "lucide-react";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     fetchUsers();
//     fetchOrders();
//   }, []);

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

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
//         console.log("No global /orders, using user.orders");
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
//       processChartData(allOrders);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Process chart data
//   const processChartData = (ordersData) => {
//     const revenueByDate = {};
//     ordersData.forEach((order) => {
//       const date = order.date
//         ? new Date(order.date).toLocaleDateString()
//         : new Date().toLocaleDateString();
//       if (!revenueByDate[date]) {
//         revenueByDate[date] = 0;
//       }
//       revenueByDate[date] += Number(order.total || 0);
//     });

//     const sortedDates = Object.keys(revenueByDate).sort(
//       (a, b) => new Date(a) - new Date(b)
//     );
//     const revenueValues = sortedDates.map((date) => revenueByDate[date]);

//     setChartData({
//       labels: sortedDates,
//       datasets: [
//         {
//           label: "Daily Revenue",
//           data: revenueValues,
//           borderColor: "#4f46e5",
//           backgroundColor: "rgba(79, 70, 229, 0.2)",
//           tension: 0.3,
//           pointBackgroundColor: "#4f46e5",
//         },
//       ],
//     });
//   };

//   // Stats
//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + Number(order.total || 0),
//     0
//   );
//   const totalOrders = orders.length;
//   const totalUsers = users.length;

//   return (
//     <div className="flex">
//       <Toaster position="top-right" />

//       {/* Sidebar */}
//       <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen overflow-y-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-4xl font-extrabold text-gray-800">
//             📊 Admin Dashboard
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Overview of users, orders, and revenue insights
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <StatCard
//             title="Total Revenue"
//             value={`₹${totalRevenue.toFixed(2)}`}
//             icon={<DollarSign className="text-green-600" size={28} />}
//           />
//           <StatCard
//             title="Total Orders"
//             value={totalOrders}
//             icon={<ShoppingCart className="text-blue-600" size={28} />}
//           />
//           <StatCard
//             title="Total Users"
//             value={totalUsers}
//             icon={<Users className="text-purple-600" size={28} />}
//           />
//         </div>

//         {/* Revenue Chart */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//             Revenue Overview
//           </h2>
//           <div className="h-80">
//             <Line
//               data={chartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: { position: "top" },
//                   title: { display: true, text: "Daily Revenue Trend" },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     ticks: {
//                       callback: (value) => "₹" + value,
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>

//         {/* Tables */}
//         <UsersTable users={users} />
//         <OrdersTable orders={orders} />

//         <Footer />
//       </div>
//     </div>
//   );
// }

// // --- Reusable Components ---
// const StatCard = ({ title, value, icon }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between">
//     <div>
//       <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
//       <p className="text-2xl font-bold text-gray-900">{value}</p>
//     </div>
//     <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
//   </div>
// );

// const UsersTable = ({ users }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-xl transition-all">
//     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
//     <div className="overflow-x-auto">
//       <table className="min-w-full border rounded-lg overflow-hidden text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Orders</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr
//               key={u.id}
//               className="hover:bg-gray-50 transition-all text-gray-700"
//             >
//               <td className="px-4 py-2 border">{u.id}</td>
//               <td className="px-4 py-2 border font-medium">{u.name}</td>
//               <td className="px-4 py-2 border">{u.email}</td>
//               <td className="px-4 py-2 border text-center">
//                 <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                   {u.orders?.length || 0}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// const OrdersTable = ({ orders }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-xl transition-all">
//     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
//     <div className="overflow-x-auto">
//       <table className="min-w-full border rounded-lg overflow-hidden text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">Order ID</th>
//             <th className="px-4 py-2 border">User ID</th>
//             <th className="px-4 py-2 border">Total</th>
//             <th className="px-4 py-2 border">Items</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((o) => (
//             <tr
//               key={o.id}
//               className="hover:bg-gray-50 transition-all text-gray-700"
//             >
//               <td className="px-4 py-2 border">{o.id}</td>
//               <td className="px-4 py-2 border">{o.userId}</td>
//               <td className="px-4 py-2 border font-medium text-green-600">
//                 ₹{Number(o.total || 0).toFixed(2)}
//               </td>
//               <td className="px-4 py-2 border text-center">
//                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
//                   {(o.items || []).length}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// export default Dashboard;






import React, { useEffect, useState, useMemo, createContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { DollarSign, ShoppingCart, Users, Package, Search, Sun, Moon, X, Home, Box, Settings, LogOut, FileDown, Edit, UserX, UserCheck, Trash2 } from 'lucide-react';
import axios from 'axios';

// --- Helper Components & API (Included to make the file self-contained) ---

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const AuthContext = createContext(null);

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
      { name: "Settings", icon: <Settings size={18} />, path: "/adminsettings" },
    ];
    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/login");
    };
    return (
      <div className="w-64 h-screen bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} className={`flex items-center px-6 py-3 transition-colors ${location.pathname.startsWith(item.path) && item.path !== "/dashboard" || location.pathname === item.path ? "bg-gray-800" : "hover:bg-gray-800"}`}>
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

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center gap-6 border-l-4" style={{ borderColor: color }}>
    <div className={`p-3 rounded-full`} style={{ backgroundColor: `${color}20` }}>
      {React.cloneElement(icon, { color: color, size: 28 })}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  </div>
);

const UsersTable = ({ users, onEdit, onBlock, onDelete }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Customers</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">User</th>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Orders</th>
            <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((u) => (
            <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                        {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{u.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                    </div>
                </div>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.isBlocked ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                    {u.isBlocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">{u.orders?.length || 0}</td>
              <td className="p-3 text-center">
                 <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(u)} className="p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition"><Edit size={16}/></button>
                    <button onClick={() => onBlock(u)} className="p-2 text-gray-400 hover:bg-yellow-100 hover:text-yellow-500 rounded-full transition">{u.isBlocked ? <UserCheck size={16}/> : <UserX size={16}/>}</button>
                    <button onClick={() => onDelete(u.id)} className="p-2 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition"><Trash2 size={16}/></button>
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UserEditModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user);
    useEffect(() => { setFormData(user); }, [user]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };
    if (!user) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit User</h2><button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"><X size={24} /></button></div>
                    <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label><select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option value="user">User</option><option value="admin">Admin</option></select></div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button></div>
                </form>
            </div>
        </div>
    );
};

// --- The Main Dashboard Component ---

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        api.get("/products"), 
        api.get("/users"),
      ]);
      
      const allUsers = usersRes.data || [];
      setProducts(productsRes.data || []);
      setUsers(allUsers);

      let allOrders = [];
      allUsers.forEach((user) => {
        if (user.orders && Array.isArray(user.orders)) {
          allOrders.push(...user.orders.map(order => ({ ...order, userId: user.id })));
        }
      });
      setOrders(allOrders);

    } catch (err) {
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
        await api.delete(`/users/${userId}`);
        toast.success("User deleted successfully.");
        fetchData();
    } catch (error) {
        toast.error("Failed to delete user.");
    }
  };
  
  const handleToggleBlockUser = async (user) => {
    try {
        const updatedUser = { ...user, isBlocked: !user.isBlocked };
        await api.patch(`/users/${user.id}`, { isBlocked: updatedUser.isBlocked });
        toast.success(updatedUser.isBlocked ? "User has been blocked." : "User has been unblocked.");
        fetchData();
    } catch (error) {
        toast.error("Failed to update user status.");
    }
  };
  
  const handleUpdateUser = async (updatedUser) => {
      try {
          await api.patch(`/users/${updatedUser.id}`, {
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
          });
          toast.success("User updated successfully.");
          setShowEditModal(false);
          setSelectedUser(null);
          fetchData();
      } catch (error) {
          toast.error("Failed to update user.");
      }
  };

  const handleOpenEditModal = (user) => {
      setSelectedUser(user);
      setShowEditModal(true);
  };

  const { filteredUsers, stats, chartData, salesByCategory } = useMemo(() => {
    if (!users.length && !orders.length) return { filteredUsers: [], stats: {}, chartData: { labels: [], datasets: [] }, salesByCategory: { labels: [], datasets: [] } };

    const filtered = searchTerm
      ? users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;

    const customerUsers = users.filter(u => u.role !== 'admin');
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const calculatedStats = {
      revenue: totalRevenue.toFixed(2),
      sales: orders.length,
      customers: customerUsers.length,
      products: products.length,
    };

    const revenueByDate = {};
    orders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString('en-CA');
        revenueByDate[date] = (revenueByDate[date] || 0) + Number(order.total || 0);
    });
    const sortedDates = Object.keys(revenueByDate).sort();
    const revenueLineData = {
        labels: sortedDates.map(d => new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })),
        datasets: [{
            label: 'Daily Revenue',
            data: sortedDates.map(date => revenueByDate[date]),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
        }],
    };
    
    const parsePrice = (price) => parseFloat(String(price).replace(/[^\d.]/g, '')) || 0;
    const categorySales = {};
    orders.forEach(order => {
        (order.items || []).forEach(item => {
            const category = item.category || 'Uncategorized';
            categorySales[category] = (categorySales[category] || 0) + (parsePrice(item.price) * (item.quantity || 1));
        });
    });
    const pieData = {
        labels: Object.keys(categorySales),
        datasets: [{
            label: 'Sales',
            data: Object.values(categorySales),
            backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
        }],
    };

    return { filteredUsers: filtered, stats: calculatedStats, chartData: revenueLineData, salesByCategory: pieData };
  }, [users, orders, products, searchTerm]);

  return (
    // This component no longer needs its own Router, it will inherit from the main App router
      <AuthContext.Provider value={{ user: { name: 'Admin' } }}>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Toaster position="top-right" />
          <Sidebar />

          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                  <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    {darkMode ? <Sun className="text-yellow-400"/> : <Moon className="text-gray-700" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`₹${stats.revenue}`} icon={<DollarSign />} color="#10B981" />
                <StatCard title="Total Sales" value={stats.sales} icon={<ShoppingCart />} color="#3B82F6" />
                <StatCard title="Total Customers" value={stats.customers} icon={<Users />} color="#8B5CF6" />
                <StatCard title="Total Products" value={stats.products} icon={<Package />} color="#F59E0B" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Revenue Trend</h2>
                    <div className="h-80"><Line data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></div>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales by Category</h2>
                    <div className="h-80"><Pie data={salesByCategory} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} /></div>
                </div>
              </div>
              <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                  <input
                    type="text"
                    placeholder="Search customers by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
              </div>
              <UsersTable users={filteredUsers} onEdit={handleOpenEditModal} onBlock={handleToggleBlockUser} onDelete={handleDeleteUser} />
            </div>
            <Footer />
          </main>
          {showEditModal && <UserEditModal user={selectedUser} onClose={() => setShowEditModal(false)} onSave={handleUpdateUser} />}
        </div>
      </AuthContext.Provider>
  );
}

export default Dashboard;











