// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function About() {
//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-yellow-500 text-white py-16 mt-16">
//         <div className="max-w-5xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             About Our Store
//           </h1>
//           <p className="text-lg md:text-xl">
//             Your one-stop shop for premium mobile accessories at unbeatable
//             prices.
//           </p>
//         </div>
//       </section>

//       {/* Mission & Story */}
//       <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
//           <p className="text-gray-600 leading-relaxed">
//             At <span className="font-semibold text-yellow-600">TekTrov</span>,
//             we believe that mobile accessories should not only be functional but
//             also stylish and affordable. Our mission is to deliver the best
//             products with top-quality service that keeps you connected and
//             powered up every day.
//           </p>
//         </div>
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
//           <p className="text-gray-600 leading-relaxed">
//             Founded in 2025, we started as a small online shop selling premium
//             AirPods. Today, we’ve grown into a trusted brand offering a wide
//             range of accessories, from chargers to headphones, all carefully
//             curated for our customers.
//           </p>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="bg-gray-100 py-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Why Choose Us?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-yellow-600 mb-2">
//                 Quality Products
//               </h3>
//               <p className="text-gray-600">
//                 Every product is handpicked and tested for durability, design,
//                 and reliability.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-yellow-600 mb-2">
//                 Affordable Prices
//               </h3>
//               <p className="text-gray-600">
//                 We believe in fair pricing without compromising on quality.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-yellow-600 mb-2">
//                 Fast Delivery
//               </h3>
//               <p className="text-gray-600">
//                 Get your accessories delivered quickly and securely to your
//                 doorstep.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center py-16 px-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">
//           Join Thousands of Happy Customers
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Shop today and experience the difference with{" "}
//           <span className="text-yellow-600 font-semibold">TechStore</span>.
//         </p>
//         <a
//           href="/product"
//           className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
//         >
//           Shop Now
//         </a>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default About;














import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, type: "spring", stiffness: 70 },
  },
};

function About() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-yellow-500 text-white py-16 mt-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Our Store
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-lg md:text-xl"
          >
            Your one-stop shop for premium mobile accessories at unbeatable
            prices.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At <span className="font-semibold text-yellow-600">TekTrov</span>,
            we believe that mobile accessories should not only be functional but
            also stylish and affordable. Our mission is to deliver the best
            products with top-quality service that keeps you connected and
            powered up every day.
          </p>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2025, we started as a small online shop selling premium
            AirPods. Today, we’ve grown into a trusted brand offering a wide
            range of accessories, from chargers to headphones, all carefully
            curated for our customers.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-100 py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Quality Products",
                desc: "Every product is handpicked and tested for durability, design, and reliability.",
              },
              {
                title: "Affordable Prices",
                desc: "We believe in fair pricing without compromising on quality.",
              },
              {
                title: "Fast Delivery",
                desc: "Get your accessories delivered quickly and securely to your doorstep.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={zoomIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center py-16 px-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Join Thousands of Happy Customers
        </h2>
        <p className="text-gray-600 mb-6">
          Shop today and experience the difference with{" "}
          <span className="text-yellow-600 font-semibold">TechStore</span>.
        </p>
        <a
          href="/product"
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Shop Now
        </a>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
