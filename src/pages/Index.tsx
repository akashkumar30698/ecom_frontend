
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";
import { CATEGORIES, PRODUCTS } from "@/data/mockData";

const Index = () => {
  // Get featured products (can be done based on any criteria)
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection categories={CATEGORIES} />
        <FeaturedProducts products={featuredProducts} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
