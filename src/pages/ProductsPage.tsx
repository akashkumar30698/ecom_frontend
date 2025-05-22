
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { FilterOptions, Product } from "@/types";
import { PRODUCTS } from "@/data/mockData";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  // Extract unique categories from products
  const categories = Array.from(new Set(PRODUCTS.map((product) => product.category)));
  
  // Apply filters
  useEffect(() => {
    let result = [...PRODUCTS];
    
    // Apply category filter from URL or state
    const categoryParam = searchParams.get("category");
    const categoryFilter = categoryParam || filters.category;
    
    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter);
    }
    
    // Apply price filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      result = result.filter((product) => {
        const price = product.discount
          ? product.price * (1 - product.discount / 100)
          : product.price;
        
        if (filters.minPrice !== undefined && price < filters.minPrice) {
          return false;
        }
        
        if (filters.maxPrice !== undefined && price > filters.maxPrice) {
          return false;
        }
        
        return true;
      });
    }
    
    // Apply size filter
    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter((product) => {
        return filters.sizes!.some((size) => product.sizes.includes(size));
      });
    }
    
    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      result = result.filter((product) => {
        return filters.colors!.some((color) => product.colors.includes(color));
      });
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low-to-high":
          result.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceA - priceB;
          });
          break;
        case "price-high-to-low":
          result.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceB - priceA;
          });
          break;
        case "newest":
          // In a real app, you would sort by date
          // For now, we'll just reverse the array to simulate "newest"
          result.reverse();
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [filters, searchParams]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    // Update URL if category changes
    if (newFilters.category && newFilters.category !== searchParams.get("category")) {
      setSearchParams({ category: newFilters.category });
    } else if (!newFilters.category && searchParams.get("category")) {
      setSearchParams({});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-heading">All Products</h1>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <ProductFilters
                  categories={categories}
                  onFilterChange={handleFilterChange}
                  className="py-4"
                />
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Desktop Filters */}
            <aside className="hidden md:block">
              <ProductFilters
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </aside>
            
            {/* Products */}
            <div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
