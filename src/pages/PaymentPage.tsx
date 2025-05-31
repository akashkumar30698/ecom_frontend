
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, CreditCard, Landmark } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const { totalItems, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")

  useEffect(() => {
    // Check if address is available in localStorage
    const savedAddress = localStorage.getItem("shippingAddress");
    if (!savedAddress) {
      toast.error("Please provide your shipping address first");
      navigate("/address");
      return;
    }
    
    try {
      setAddress(JSON.parse(savedAddress));
    } catch (error) {
      console.error("Error parsing address data:", error);
      navigate("/address");
    }
  }, [navigate]);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Order has been placed.");
      clearCart();
      navigate("/payment-success");
    }, 2000);
  };

  if (totalItems === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Your Cart is Empty</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Please add some products to your cart before checkout.</p>
              <Button asChild className="bg-navy-900 hover:bg-navy-800">
                <Link  to={`/products?userId=${userId || "no_name"}`}>Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-heading font-bold mb-6">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="flex items-center text-sm mb-8">
            <span className="text-navy-900 font-medium">Cart</span>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-navy-900 font-medium">Address</span>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-navy-900 font-medium">Payment</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Payment Options */}
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  {address && (
                    <div className="text-sm">
                      <p className="font-medium">{address.fullName}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      <p>Phone: {address.phoneNumber}</p>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => navigate("/address")}
                  >
                    Change Address
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    className="space-y-4" 
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center">
                        UPI Payment
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center">
                        <Landmark className="w-4 h-4 mr-2" />
                        Net Banking
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <Button 
                    className="w-full mt-6 bg-navy-900 hover:bg-navy-800"
                    disabled={isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? "Processing..." : `Pay ${formatCurrency(totalPrice > 999 ? totalPrice : totalPrice + 100)}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Items ({totalItems})</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatCurrency(totalPrice > 999 ? 0 : 100)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(totalPrice > 999 ? totalPrice : totalPrice + 100)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {totalPrice > 999 ? (
                        <p className="text-green-600">Free shipping on orders above ₹999!</p>
                      ) : (
                        <p>Add items worth ₹{(1000 - totalPrice).toFixed(2)} more for free shipping</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
