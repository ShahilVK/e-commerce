// src/pages/Contact.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thank you for contacting us! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full mx-auto px-6 py-12 pt-20">
        <Navbar />
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="bg-gray-100 shadow-md rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
          <p className="text-gray-600">
            Have any questions? We'd love to hear from you. Reach out to us
            through the details below.
          </p>

          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <p>123 Mobile Street, Tech City, India</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600" />
            <p>+91 98765 43210</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <p>support@mobilemart.com</p>
          </div>

          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.709079331173!2d75.781!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzMxLjciTiA3NcKwNDYnNTIuMCJF!5e0!3m2!1sen!2sin!4v1694681591329!5m2!1sen!2sin"
            width="100%"
            height="250"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg border"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
