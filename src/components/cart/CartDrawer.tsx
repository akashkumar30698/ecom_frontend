
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-lg">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Add some products to your cart
            </p>
            <Button 
              onClick={() => setIsOpen(false)} 
              variant="outline"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pt-4">
              <div className="space-y-4 pr-3">
                {cartItems.map((item) => (
                  <CartItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t pt-4 mt-auto space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-sm">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-medium">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-navy-900 hover:bg-navy-800">
                  Proceed to Checkout
                </Button>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
