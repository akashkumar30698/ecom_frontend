
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity, selectedSize, selectedColor } = item;
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleQuantityIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="flex gap-4">
      <div className="h-24 w-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-medium">{product.name}</h4>
            <div className="text-xs text-muted-foreground mt-1 space-y-1">
              {selectedSize && <p>Size: {selectedSize}</p>}
              {selectedColor && <p>Color: {selectedColor}</p>}
              <p>Price: {formatCurrency(displayPrice)}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={handleQuantityDecrease}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={handleQuantityIncrease}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="text-sm font-medium">
            {formatCurrency(displayPrice * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
