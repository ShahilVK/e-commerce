


import React, { useState } from "react";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// Updated InfoCard to look good on the new dark background
const InfoCard = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="bg-red-500/20 text-red-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <div className="text-gray-400">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    toast.success("Thank you for your message! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <Toaster position="top-right" />
      
      <main className="flex-grow flex items-center justify-center py-16 pt-24">
        <div className="max-w-6xl w-full mx-auto px-4">
          {/* ✨ New Feature: Main container with a card-like effect */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-5">
            
            {/* ✨ New Feature: Left "Information Panel" */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="md:col-span-2 bg-gray-800 text-white p-8 space-y-8"
            >
              <h2 className="text-3xl font-bold">Contact Information</h2>
              <p className="text-gray-400">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-6">
                <InfoCard icon={<Phone size={24} />} title="Call Us">
                  <p>+91 8714059965</p>
                </InfoCard>
                <InfoCard icon={<Mail size={24} />} title="Email Us">
                  <p>support@tektrov.com</p>
                </InfoCard>
                <InfoCard icon={<MapPin size={24} />} title="Our Office">
                  <p>123 TekTrov Lane, Tech City, 560001</p>
                </InfoCard>
              </div>
            </motion.div>

            {/* ✨ New Feature: Right "Form Panel" */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="md:col-span-3 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"><User className="h-5 w-5 text-gray-400" /></span>
                  <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"/>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="h-5 w-5 text-gray-400" /></span>
                  <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"/>
                </div>
                <div className="relative">
                  <span className="absolute top-3 left-0 flex items-center pl-3"><MessageSquare className="h-5 w-5 text-gray-400" /></span>
                  <textarea name="message" placeholder="Your Message" rows="5" value={form.message} onChange={handleChange} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform duration-300">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;