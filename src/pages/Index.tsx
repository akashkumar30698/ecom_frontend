
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import CategoryPage from "./CategoryPage";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Index = () => {
  // Get featured products (can be done based on any criteria)
   const [featuredProducts, setFeaturedProducts] = useState([]);
   const { isSignedIn,user } = useUser()
   const navigate = useNavigate()

   useEffect(()=>{
     if (isSignedIn) {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("adminLog")
        console.log("isSignedIn: ",isSignedIn)
         navigate(`/?userId=${user?.id}`)
     }
   },[isSignedIn])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllProducts`);
        setFeaturedProducts(res?.data.slice(0,4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeatured();
  }, []);
 // const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryPage/>
        <FeaturedProducts products={featuredProducts} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
