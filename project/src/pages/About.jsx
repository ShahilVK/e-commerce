
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ShieldCheck, BadgePercent, Truck, Rocket, Award, Users as TeamIcon, Smile, Package, Star } from "lucide-react";

// Animation variants for Framer Motion
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

function About() {
  const values = [
    { icon: <ShieldCheck size={32} className="text-red-500" />, title: "Quality Products", desc: "Every product is handpicked and tested for durability, design, and reliability to ensure you get the best." },
    { icon: <BadgePercent size={32} className="text-red-500" />, title: "Affordable Prices", desc: "We believe in fair, transparent pricing without ever compromising on the quality of our accessories." },
    { icon: <Truck size={32} className="text-red-500" />, title: "Fast Delivery", desc: "Get your favorite accessories delivered quickly and securely right to your doorstep, anywhere in India." },
  ];
  
  const stats = [
      { icon: <Smile size={32} className="text-red-500"/>, value: "10,000+", label: "Happy Customers" },
      { icon: <Package size={32} className="text-red-500"/>, value: "200+", label: "Products Delivered" },
      { icon: <Star size={32} className="text-red-500"/>, value: "4.9/5", label: "Average Rating" },
  ];

  const timelineEvents = [
    { icon: <Rocket />, year: "2025", title: "Our Humble Beginning", desc: "TekTrov was born from a passion for great tech, starting as a small online shop with a big dream." },
    { icon: <Award />, year: "2026", title: "10,000 Happy Customers", desc: "We celebrated serving thousands of satisfied tech lovers across the country, a milestone that fuels our journey." }
  ];

  const galleryImages = [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
      "https://img.freepik.com/premium-photo/stylish-headphones-background-music-equipment-with-bright-colored-lighting_199743-24510.jpg",
      "https://kevurugames.com/wp-content/uploads/2023/07/men-futuristic-vr-simulator-wearing-protective-eyewear-generative-ai.webp"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center text-white py-28" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
          <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
            <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }} className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              About TekTrov
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              We're not just a store; we're a community of tech enthusiasts dedicated to enhancing your digital life.
            </motion.p>
          </div>
        </section>
        
        {/* Statistics Section */}
        <section className="bg-white py-16">
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.3 }} 
                variants={staggerContainer} 
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6"
            >
                {stats.map((stat, index) => (
                    <motion.div key={index} variants={fadeUp} className="p-6 border border-gray-200 rounded-lg">
                        <div className="flex justify-center items-center mb-4 text-red-500">{stat.icon}</div>
                        <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
                        <p className="text-gray-500 mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>

        {/* Company Timeline Section */}
        <section className="bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Our Journey</h2>
                <div className="relative">
                    <div className="absolute left-9 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="space-y-12">
                       {timelineEvents.map((event, index) => (
                         <motion.div key={index} variants={fadeUp} className="pl-24 relative">
                            <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-gray-200">
                                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse">
                                    {event.icon}
                                </div>
                            </div>
                            <p className="font-bold text-red-500">{event.year}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                            <p className="text-gray-600">{event.desc}</p>
                         </motion.div>
                       ))}
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8 text-center">
              {values.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-red-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">A Glimpse Into Our World</h2>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((src, index) => (
                        <motion.div key={index} variants={fadeUp} className="group overflow-hidden rounded-lg shadow-lg">
                           <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
        
        {/* Call to Action (CTA) Section */}
        <section className="bg-white text-gray-800">
            <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl font-bold mb-4">Join Our Tech Community</motion.h2>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Ready to upgrade your mobile experience? Shop today and discover the TekTrov difference.
                </motion.p>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Link to="/product" className="inline-block bg-red-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">
                        Shop All Products
                    </Link>
                </motion.div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;