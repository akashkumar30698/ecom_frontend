
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, ChevronLeft } from "lucide-react";
import { PRODUCTS } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/products/ProductGrid";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  
  // Get related products (from same category)
  const relatedProducts = product
    ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-4">
              Sorry, the product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="bg-navy-900 hover:bg-navy-800">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;
  
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              to="/products" 
              className="text-sm text-muted-foreground inline-flex items-center hover:text-navy-700"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.discount && (
                  <Badge className="absolute top-4 right-4 bg-coral text-white">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
            </Card>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-heading font-bold">{product.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-medium">
                  {formatCurrency(displayPrice)}
                </span>
                
                {product.discount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="space-y-4 pt-2">
                {/* Size Selection */}
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Size
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Color Selection */}
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Color
                  </label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color} className="capitalize">
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleQuantityDecrease}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleQuantityIncrease}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Add to Cart */}
                <Button
                  className="w-full mt-4 bg-navy-900 hover:bg-navy-800"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-heading font-bold mb-6">You Might Also Like</h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
