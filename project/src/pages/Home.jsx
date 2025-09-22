
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Product from './Product';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import TopProducts from './TopProducts';
import Footer from '../components/Footer';
import ProductsWithFilter from './ProductsWithFilter';
import HomeBanner from './HomeBanner';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10">

     
      <Navbar />

      <HomeBanner />


      <Hero />

    
      




      <FeaturesSection />

      <TopProducts />



      <ProductsWithFilter />


      <Footer />




    </div>
  );
}

export default Home;

