
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
import { ShoppingCart, Minus, Plus, ChevronLeft, Star } from "lucide-react";
import { PRODUCTS } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/products/ProductGrid";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  
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
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both size and color before adding to cart");
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`Added ${quantity} ${product.name} to your cart!`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review.trim()) {
      toast.success("Review submitted successfully!");
      setReview("");
    } else {
      toast.error("Please enter a review before submitting");
    }
  };
  
  // Mock ratings data
  const rating = 4.5;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto max-w-7xl">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 bg-white rounded-xl p-6 shadow-sm">
            {/* Product Image */}
            <div className="overflow-hidden rounded-lg shadow-md">
              <div className="relative aspect-square">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.discount && (
                  <Badge className="absolute top-4 right-4 bg-coral text-white text-sm">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-gray-800">{product.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                  <div className="flex items-center ml-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({rating})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-medium text-navy-900">
                  {formatCurrency(displayPrice)}
                </span>
                
                {product.discount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600">{product.description}</p>
              
              <div className="space-y-4 pt-2 border-t border-gray-100">
                {/* Size Selection */}
                <div>
                  <label className="text-sm font-medium mb-1 block text-gray-700">
                    Size <span className="text-red-500">*</span>
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full">
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
                  <label className="text-sm font-medium mb-1 block text-gray-700">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full">
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
                  <label className="text-sm font-medium mb-1 block text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleQuantityDecrease}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center border-y border-input h-10 flex items-center justify-center">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleQuantityIncrease}
                      className="rounded-l-none"
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
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Customer Reviews Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
            <h2 className="text-2xl font-heading font-bold mb-6 text-gray-800">Customer Reviews</h2>
            
            <form onSubmit={handleReviewSubmit} className="mb-8">
              <label className="block font-medium mb-2 text-gray-700">
                Leave a Review
              </label>
              <Textarea
                placeholder="Share your thoughts about this product..."
                className="mb-3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <Button type="submit" className="bg-navy-900 hover:bg-navy-800">
                Submit Review
              </Button>
            </form>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-heading font-bold mb-6 text-gray-800">You Might Also Like</h2>
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
