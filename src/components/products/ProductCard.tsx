
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isSignedIn } = useUser()
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  
  const {
    _id,
    name,
    price,
    discount,
    imageUrl,
    category,
    inStock
  } = product;

  const displayPrice = discount ? price * (1 - discount / 100) : price;


  const handleAddToCart = () => {
    if(!isSignedIn){
      window.location.href = `/sign-in`
    }else{
      addToCart(product, 1)
    }
  }
  
  return (
    <Card className="overflow-hidden border border-border group">
      <div className="relative product-card-zoom">
        <Link to={`/products/${_id}?userId=${userId || "no_name"}`} className="block overflow-hidden aspect-square">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full transition-all"
          />
        </Link>
        
        {discount && (
          <Badge className="absolute top-2 right-2 bg-coral text-white">
            {discount}% OFF
          </Badge>
        )}
        
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Badge variant="outline" className="text-white border-white">
              Out of Stock
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full opacity-0 transition-all duration-200 bg-white/90 group-hover:translate-y-0 group-hover:opacity-100">
          <Button 
            className="w-full bg-navy-900 hover:bg-navy-800 text-white"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
           <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-3">
        <Link to={`/products/${_id}?userId=${userId || "no_name"}`} className="block">
          <h3 className="font-medium text-sm truncate">{name}</h3>
        </Link>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1.5">
            {discount ? (
              <>
                <span className="text-sm font-medium">{formatCurrency(displayPrice)}</span>
                <span className="text-xs line-through text-muted-foreground">
                  {formatCurrency(price)}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium">{formatCurrency(price)}</span>
            )}
          </div>
          
          <Badge variant="outline" className="text-[10px] py-0">
            {category}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
