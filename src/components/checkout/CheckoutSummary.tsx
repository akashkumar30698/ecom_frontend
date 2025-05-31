import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CartItem {
  product: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    sizes: string[];
    colors: string[];
  };
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CheckoutSummaryProps {
  cartItems: CartItem[];
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(true)
  
  
  const subtotal = cartItems.reduce(
   (acc, item) => acc + item.product.price * item.quantity,
   0
  );
  const shippingCost = 5.99;
  const tax = subtotal * 0.014; // 1.4% tax rate
  const total = subtotal + shippingCost + tax;

  useEffect(() => {
    console.log("ye le data: ", cartItems, subtotal);
    sessionStorage.setItem("totalAmount",JSON.stringify(total))
  }, [cartItems, subtotal,total]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <button
          className="lg:hidden text-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        {/* Items */}
        <div className="mb-6 max-h-64 overflow-y-auto">
          {cartItems.map((item, index) => (
            <div key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex py-3 border-b">
              <div className="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 relative">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-full w-full object-cover object-center rounded-md"
                />
                <div className="absolute -top-2 -right-2 bg-gray-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {item.quantity}
                </div>
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="text-sm font-medium">{item.product.name}</h4>
                <div className="text-xs text-gray-500 mt-1">
                  {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                </div>
                <div className="text-sm font-medium mt-1">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div className="space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
