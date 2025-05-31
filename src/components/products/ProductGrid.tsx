
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { useEffect } from "react";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  useEffect(()=>{
     console.log("products: ",products,title)
  },[products,title])

  return (
    <section className="py-8">
      {title && <h2 className="text-2xl font-heading font-semibold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
