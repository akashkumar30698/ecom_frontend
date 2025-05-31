
import { Product } from "@/types";
import ProductGrid from "../products/ProductGrid";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-heading mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Our most popular designs</p>
        </div>
        
        <ProductGrid products={products} />
        
        <div className="mt-8 text-center">
          <Link 
            to={`/products?userId=${userId || "no_name"}`} 
            className="text-navy-900 font-medium hover:text-navy-700 underline-offset-4 hover:underline"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
