// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
// import toast, { Toaster } from "react-hot-toast";

// function AdminUsers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       if (res.data) {
//         setUsers(res.data);
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       toast.error("Failed to fetch users");
//     }
//   };

//   // Delete User
//   const handleDeleteUser = async (id) => {
//     try {
//       await api.delete(`/users/${id}`);
//       toast.success("User deleted!");
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete user");
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
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

//         {/* Users Table */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 hover:shadow-2xl transition-all flex-1">
//           <div className="overflow-x-auto">
//             <table className="min-w-full border rounded-lg overflow-hidden">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-4 py-2 border">User ID</th>
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Email</th>
//                   <th className="px-4 py-2 border">Orders</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u.id} className="hover:bg-gray-100 transition-all">
//                     <td className="px-4 py-2 border">{u.id}</td>
//                     <td className="px-4 py-2 border">{u.name}</td>
//                     <td className="px-4 py-2 border">{u.email}</td>
//                     <td className="px-4 py-2 border">
//                       <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
//                         {(u.orders || []).length}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <button
//                         onClick={() => handleDeleteUser(u.id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {users.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4 text-gray-500">
//                       No users found
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

// export default AdminUsers;



import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { 
    Trash2, Edit, Search, X, Users, ChevronLeft, ChevronRight, 
    Home, Box, ShoppingCart, Settings, LogOut, UserX, UserCheck
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

// A dedicated form component for editing users to keep the main component cleaner
const UserEditForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
                <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
            </div>
            <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required /></div>
                <div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required /></div>
                <div><label className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md bg-white">
                        <option value="user">User</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
        </form>
    );
};


// --- Main AdminUsers Component ---
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/users");
      // Exclude admin users from the list
      setUsers(res.data.filter(u => u.role !== 'admin') || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
  };
  
  const handleUpdateUser = async (updatedUser) => {
    const loadingToast = toast.loading("Updating user...");
    try {
        await api.patch(`/users/${updatedUser.id}`, updatedUser);
        toast.success("User updated successfully!", { id: loadingToast });
        setEditingUser(null);
        fetchUsers();
    } catch {
        toast.error("Failed to update user.", { id: loadingToast });
    }
  };

  const handleToggleBlock = async (user) => {
    const updatedStatus = !user.isBlocked;
    const action = updatedStatus ? 'blocked' : 'unblocked';
    const loadingToast = toast.loading(`Updating user status...`);
    try {
        await api.patch(`/users/${user.id}`, { isBlocked: updatedStatus });
        toast.success(`User has been ${action}.`, { id: loadingToast });
        fetchUsers();
    } catch {
        toast.error(`Failed to ${action} user.`, { id: loadingToast });
    }
  };

  const handleDeleteRequest = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/users/${userToDelete.id}`);
      toast.success(`User "${userToDelete.name}" deleted successfully!`);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user.");
    } finally {
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const { currentUsers, totalPages } = useMemo(() => {
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    const pages = Math.ceil(filtered.length / usersPerPage);
    const paginated = filtered.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    return { currentUsers: paginated, totalPages: pages };
  }, [users, search, currentPage, usersPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  
  const renderSkeletonLoader = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Users</h1>
          <div className="relative mb-6 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
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
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">User</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Orders</th>
                    <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-10 text-gray-500 dark:text-gray-400">
                          <div className="flex flex-col items-center gap-2"><Users size={40}/><span className="font-medium">No users found.</span></div>
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((u) => (
                      <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="p-3">
                            <p className="font-bold text-gray-800 dark:text-gray-100">{u.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                        </td>
                        <td className="p-3">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{u.isBlocked ? 'Blocked' : 'Active'}</span>
                        </td>
                        <td className="p-3 font-medium text-center text-gray-700 dark:text-gray-300">{(u.orders || []).length}</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleOpenEditModal(u)} className="p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-500 rounded-full transition"><Edit size={16} /></button>
                            <button onClick={() => handleToggleBlock(u)} className="p-2 text-gray-400 hover:bg-yellow-100 hover:text-yellow-500 rounded-full transition">{u.isBlocked ? <UserCheck size={16}/> : <UserX size={16}/>}</button>
                            <button onClick={() => handleDeleteRequest(u)} className="p-2 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition"><Trash2 size={16} /></button>
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

      <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)}>
        {editingUser && <UserEditForm user={editingUser} onSave={handleUpdateUser} onCancel={() => setEditingUser(null)} />}
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <div className="p-6">
            <div className="text-center">
                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"><Trash2 className="h-6 w-6 text-red-600" /></div>
                 <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Delete User</h3>
                 <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                     <p>Are you sure you want to delete <span className="font-semibold text-gray-700">{userToDelete?.name}</span>?</p>
                     <p>This action cannot be undone.</p>
                 </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
                 <button type="button" onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                 <button type="button" onClick={confirmDeleteUser} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
            </div>
        </div>
      </Modal>
    </div>
  );
}


// This wrapper is provided so the component can be rendered in isolation.
// In a real app, you would render AdminUsers as part of your main router.
const App = () => (
    <Router>
        <AdminUsers />
    </Router>
);

export default AdminUsers;



