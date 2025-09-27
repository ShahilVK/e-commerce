







// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
// import toast, { Toaster } from "react-hot-toast";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: "",
//     smallDescription: "",
//   });

//   // Fetch data from backend
//   useEffect(() => {
//     fetchProducts();
//     fetchUsers();
//     fetchOrders();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/orders");
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new product
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       toast.error("Please fill all product details!");
//       return;
//     }
//     try {
//       await api.post("/products", newProduct);
//       toast.success("Product added!");
//       setNewProduct({ name: "", price: "", image: "", smallDescription: "" });
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // --- Dashboard Stats ---
//   const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
//   const totalOrders = orders.length;
//   const totalUsers = users.length;
//   const totalProducts = products.length;

//   return (
//     <div className="pt-16">
//       <Toaster position="top-right" />
//       <div className="flex">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white p-6 rounded-lg shadow text-center">
//               <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
//               <p className="text-2xl font-bold text-green-600">₹{totalRevenue}</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow text-center">
//               <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
//               <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow text-center">
//               <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
//               <p className="text-2xl font-bold text-purple-600">{totalUsers}</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow text-center">
//               <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
//               <p className="text-2xl font-bold text-orange-600">{totalProducts}</p>
//             </div>
//           </div>

//           {/* Add Product */}
//           <div className="bg-white p-6 rounded-lg shadow mb-8">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 value={newProduct.name}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, name: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Price"
//                 value={newProduct.price}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, price: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={newProduct.image}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, image: e.target.value })
//                 }
//                 className="border p-2 rounded col-span-1 md:col-span-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Short Description"
//                 value={newProduct.smallDescription}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, smallDescription: e.target.value })
//                 }
//                 className="border p-2 rounded col-span-1 md:col-span-2"
//               />
//             </div>
//             <button
//               onClick={handleAddProduct}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition"
//             >
//               Add Product
//             </button>
//           </div>

//           {/* Products Table */}
//           <div className="bg-white p-6 rounded-lg shadow mb-8">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700">Products</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 border">ID</th>
//                     <th className="px-4 py-2 border">Name</th>
//                     <th className="px-4 py-2 border">Price</th>
//                     <th className="px-4 py-2 border">Image</th>
//                     <th className="px-4 py-2 border">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((p) => (
//                     <tr key={p.id}>
//                       <td className="px-4 py-2 border">{p.id}</td>
//                       <td className="px-4 py-2 border">{p.name}</td>
//                       <td className="px-4 py-2 border">₹{p.price}</td>
//                       <td className="px-4 py-2 border">
//                         <img
//                           src={p.image}
//                           alt={p.name}
//                           className="w-20 h-20 object-contain"
//                         />
//                       </td>
//                       <td className="px-4 py-2 border">
//                         <button
//                           onClick={() => handleDeleteProduct(p.id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Users Table */}
//           <div className="bg-white p-6 rounded-lg shadow mb-8">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 border">ID</th>
//                     <th className="px-4 py-2 border">Name</th>
//                     <th className="px-4 py-2 border">Email</th>
//                     <th className="px-4 py-2 border">Cart Items</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u.id}>
//                       <td className="px-4 py-2 border">{u.id}</td>
//                       <td className="px-4 py-2 border">{u.name}</td>
//                       <td className="px-4 py-2 border">{u.email}</td>
//                       <td className="px-4 py-2 border">{u.cart?.length || 0}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white p-6 rounded-lg shadow mb-8">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 border">Order ID</th>
//                     <th className="px-4 py-2 border">User ID</th>
//                     <th className="px-4 py-2 border">Total</th>
//                     <th className="px-4 py-2 border">Items</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order) => (
//                     <tr key={order.id}>
//                       <td className="px-4 py-2 border">{order.id}</td>
//                       <td className="px-4 py-2 border">{order.userId}</td>
//                       <td className="px-4 py-2 border">₹{order.total}</td>
//                       <td className="px-4 py-2 border">{order.items?.length || 0}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;








// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
// import toast, { Toaster } from "react-hot-toast";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: "",
//     smallDescription: "",
//   });

//   useEffect(() => {
//     fetchProducts();
//     fetchUsers();
//     fetchOrders();
//   }, []);

//   // Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

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
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add Product
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       toast.error("Please fill all product details!");
//       return;
//     }
//     try {
//       await api.post("/products", newProduct);
//       toast.success("Product added!");
//       setNewProduct({ name: "", price: "", image: "", smallDescription: "" });
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete Product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // --- Stats ---
//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + Number(order.total || 0),
//     0
//   );
//   const totalOrders = orders.length;
//   const totalUsers = users.length;
//   const totalProducts = products.length;

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
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Revenue"
//             value={`₹${totalRevenue.toFixed(2)}`}
//             color="green"
//           />
//           <StatCard title="Total Orders" value={totalOrders} color="blue" />
//           <StatCard title="Total Users" value={totalUsers} color="purple" />
//           <StatCard
//             title="Total Products"
//             value={totalProducts}
//             color="orange"
//           />
//         </div>

//         {/* Add Product */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//             Add New Product
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="Product Name"
//               value={newProduct.name}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, name: e.target.value })
//               }
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <input
//               type="text"
//               placeholder="Price"
//               value={newProduct.price}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, price: e.target.value })
//               }
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={newProduct.image}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, image: e.target.value })
//               }
//               className="border p-2 rounded col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <input
//               type="text"
//               placeholder="Short Description"
//               value={newProduct.smallDescription}
//               onChange={(e) =>
//                 setNewProduct({
//                   ...newProduct,
//                   smallDescription: e.target.value,
//                 })
//               }
//               className="border p-2 rounded col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>
//           <button
//             onClick={handleAddProduct}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition"
//           >
//             Add Product
//           </button>
//         </div>

//         {/* Tables */}
//         <DataTable title="Products" data={products} onDelete={handleDeleteProduct} />
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

// const DataTable = ({ title, data, onDelete }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
//     <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
//     <div className="overflow-x-auto">
//       <table className="min-w-full border rounded-lg overflow-hidden">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Price</th>
//             <th className="px-4 py-2 border">Image</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((p) => (
//             <tr key={p.id} className="hover:bg-gray-100 transition-all">
//               <td className="px-4 py-2 border">{p.id}</td>
//               <td className="px-4 py-2 border">{p.name}</td>
//               <td className="px-4 py-2 border">
//                 ₹{Number(p.price || 0).toFixed(2)}
//               </td>
//               <td className="px-4 py-2 border">
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   className="w-20 h-20 object-contain rounded"
//                 />
//               </td>
//               <td className="px-4 py-2 border">
//                 <button
//                   onClick={() => onDelete(p.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
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









import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

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
        console.log("No global /orders, using user.orders");
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
      processChartData(allOrders);
    } catch (err) {
      console.error(err);
    }
  };

  // Process chart data
  const processChartData = (ordersData) => {
    const revenueByDate = {};
    ordersData.forEach((order) => {
      const date = order.date
        ? new Date(order.date).toLocaleDateString()
        : new Date().toLocaleDateString();
      if (!revenueByDate[date]) {
        revenueByDate[date] = 0;
      }
      revenueByDate[date] += Number(order.total || 0);
    });

    const sortedDates = Object.keys(revenueByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const revenueValues = sortedDates.map((date) => revenueByDate[date]);

    setChartData({
      labels: sortedDates,
      datasets: [
        {
          label: "Daily Revenue",
          data: revenueValues,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          tension: 0.3,
          pointBackgroundColor: "#4f46e5",
        },
      ],
    });
  };

  // Stats
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );
  const totalOrders = orders.length;
  const totalUsers = users.length;

  return (
    <div className="flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of users, orders, and revenue insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toFixed(2)}`}
            icon={<DollarSign className="text-green-600" size={28} />}
          />
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<ShoppingCart className="text-blue-600" size={28} />}
          />
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<Users className="text-purple-600" size={28} />}
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Revenue Overview
          </h2>
          <div className="h-80">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Daily Revenue Trend" },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => "₹" + value,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Tables */}
        <UsersTable users={users} />
        <OrdersTable orders={orders} />

        <Footer />
      </div>
    </div>
  );
}

// --- Reusable Components ---
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
  </div>
);

const UsersTable = ({ users }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-xl transition-all">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="hover:bg-gray-50 transition-all text-gray-700"
            >
              <td className="px-4 py-2 border">{u.id}</td>
              <td className="px-4 py-2 border font-medium">{u.name}</td>
              <td className="px-4 py-2 border">{u.email}</td>
              <td className="px-4 py-2 border text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {u.orders?.length || 0}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const OrdersTable = ({ orders }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-xl transition-all">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o.id}
              className="hover:bg-gray-50 transition-all text-gray-700"
            >
              <td className="px-4 py-2 border">{o.id}</td>
              <td className="px-4 py-2 border">{o.userId}</td>
              <td className="px-4 py-2 border font-medium text-green-600">
                ₹{Number(o.total || 0).toFixed(2)}
              </td>
              <td className="px-4 py-2 border text-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {(o.items || []).length}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Dashboard;
