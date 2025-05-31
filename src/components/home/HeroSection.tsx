
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const HeroSection = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  return (
    <section className="relative overflow-hidden">
      <div className="bg-navy-900 text-white">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 py-12 md:py-20 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading">
                Premium T-Shirts for Every Style
              </h1>
              <p className="text-lg text-gray-200 md:pr-12">
                Discover our new collection of sustainable, high-quality t-shirts designed for comfort and style.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-coral hover:bg-coral-400 text-white">
                  <Link to={`/products?userId=${userId || "no_name"}`}>Shop Now</Link>
                </Button>
                <Button asChild size="lg"  className="border-white text-white hover:bg-white/10">
                  <Link to={`/categories?userId=${userId || "no_name"}`}>Browse Categories</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=960&q=80" 
                  alt="T-shirt collection" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-coral text-white p-3 rounded-lg shadow-lg transform rotate-6">
                <p className="text-sm font-bold">New Collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Bar */}
      <div className="bg-navy-100 py-4">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <h3 className="text-sm font-medium">Free Shipping</h3>
              <p className="text-xs text-gray-600">On orders over $50</p>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium">Easy Returns</h3>
              <p className="text-xs text-gray-600">30-day return policy</p>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium">Secure Payments</h3>
              <p className="text-xs text-gray-600">100% secure checkout</p>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium">Customer Support</h3>
              <p className="text-xs text-gray-600">24/7 assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
