// import React from 'react';
// import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Product from './pages/Product';
// import AuthProvider from './context/AuthContext';
// import {Toaster} from 'react-hot-toast'
// import Wishlist from './pages/Wishlist';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// import Payment from './pages/Payment';
// import Footer from './components/Footer';
// import OrderSuccess from './pages/OrderSuccess';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Dashboard from './Admin/Dashboard';




// function App() {
//   return (
//     <BrowserRouter>
//     <Toaster position="top-right" />
//     <AuthProvider>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register/>} />
//       <Route path='/product' element={<Product />} />
//       <Route path="*" element={<Navigate to="/" />} />
//       <Route path='/wishlist' element={<Wishlist />} />
//       <Route path='/cart' element={<Cart />} />
//       <Route path='/profile' element={<Profile />} />
//       <Route path="/payment" element={<Payment />} />
//       <Route path='/footer' element={<Footer />} />
//       <Route path='/ordersuccess' element={<OrderSuccess />} />
//       <Route path='/about' element={<About />} />
//       <Route path='/contact' element={<Contact />} />
//       <Route path='/dashboard' element={<Dashboard />} />


//     </Routes>
//     </AuthProvider>
//     </BrowserRouter>

//   );
// }

// export default App;











// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Product from "./pages/Product";
// import Wishlist from "./pages/Wishlist";
// import Cart from "./pages/Cart";
// import Profile from "./pages/Profile";
// import Payment from "./pages/Payment";
// import OrderSuccess from "./pages/OrderSuccess";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Footer from "./components/Footer";
// import Dashboard from "./Admin/Dashboard";

// import AuthProvider, { useAuth } from "./context/AuthContext";
// import { Toaster } from "react-hot-toast";


// // Admin Route Guard
// const AdminRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/" />;
//   }
//   return children;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Toaster position="top-right" />
      
//       <AuthProvider>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/product" element={<Product />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* Auth Protected Routes */}
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/ordersuccess" element={<OrderSuccess />} />

//           {/* Admin Dashboard Route */}
//           <Route
//             path="/dashboard"
//             element={
//               <AdminRoute>
//                 <Dashboard />
//               </AdminRoute>
//             }
//           />
          
       

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//         {/* <Footer /> */}
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;






import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./components/Orders"; 
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./Admin/Dashboard";

// Import Components and Hooks
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import AdminProducts from "./Admin/AdminProducts";

// --- Route Guards ---

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};


function App() {
  return (
    // The <BrowserRouter> and providers are removed from this file.
    // They now live in main.jsx.
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* --- Authenticated User Routes --- */}
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/ordersuccess" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> {/* <-- 2. ADD THE NEW ROUTE */}
        

        {/* --- Admin Dashboard Route --- */}
        <Route
          path="/dashboard/*"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/adminproducts" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;



















