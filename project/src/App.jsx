import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import AuthProvider from './context/AuthContext';
import {Toaster} from 'react-hot-toast'
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import Footer from './components/Footer';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './Admin/Dashboard';




function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path='/product' element={<Product />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/payment" element={<Payment />} />
      <Route path='/footer' element={<Footer />} />
      <Route path='/ordersuccess' element={<OrderSuccess />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/dashboard' element={<Dashboard />} />


    </Routes>
    </AuthProvider>
    </BrowserRouter>

  );
}

export default App;











