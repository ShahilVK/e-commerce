// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, Box, Users, ShoppingCart, Settings, LogOut } from "lucide-react"; // Using lucide icons

// const Sidebar = () => {
//   const location = useLocation(); // to highlight active link

//   const menuItems = [
//     { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
//     { name: "Products", icon: <Box size={18} />, path: "/adminproducts" },
//     { name: "Orders", icon: <ShoppingCart size={18} />, path: "/adminorders" },
//     { name: "Users", icon: <Users size={18} />, path: "/adminusers" },
//     { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/settings" },
//   ];

//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
//       <div className="p-6 text-xl font-bold border-b border-gray-700">
//         Admin Panel
//       </div>

//       <nav className="flex-1 mt-4">
//         {menuItems.map((item, index) => (
//           <Link
//             key={index}
//             to={item.path}
//             className={`flex items-center px-6 py-3 hover:bg-gray-800 transition-colors ${
//               location.pathname === item.path ? "bg-gray-800" : ""
//             }`}
//           >
//             <span className="mr-3">{item.icon}</span>
//             <span>{item.name}</span>
//           </Link>
//         ))}
//       </nav>

//       <div className="p-6 border-t border-gray-700">
//         <button className="flex items-center w-full text-left hover:bg-gray-800 px-4 py-2 rounded">
//           <LogOut size={18} className="mr-3" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;











import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Box, Users, ShoppingCart, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); // For programmatic navigation

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Products", icon: <Box size={18} />, path: "/adminproducts" },
    { name: "Orders", icon: <ShoppingCart size={18} />, path: "/adminorders" },
    { name: "Users", icon: <Users size={18} />, path: "/adminusers" },
    { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/settings" },
  ];

  // Logout function
  const handleLogout = () => {
    // Clear any stored auth (if using localStorage/sessionStorage)
    localStorage.removeItem("user"); // optional
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-6 py-3 hover:bg-gray-800 transition-colors ${
              location.pathname === item.path ? "bg-gray-800" : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left hover:bg-gray-800 px-4 py-2 rounded"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
