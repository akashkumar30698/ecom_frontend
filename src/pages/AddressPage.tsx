
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  
  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!addressData.fullName || !addressData.phoneNumber || !addressData.addressLine1 || 
        !addressData.city || !addressData.state || !addressData.pincode) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (addressData.pincode.length !== 6 || !/^\d+$/.test(addressData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    
    if (addressData.phoneNumber.length !== 10 || !/^\d+$/.test(addressData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    // Store address in localStorage (in a real app, you would send this to your backend)
    localStorage.setItem("shippingAddress", JSON.stringify(addressData));
    
    // Navigate to payment page
    toast.success("Address saved successfully!");
    navigate(`/payment?userId=${userId || "no_name"}`);
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
                <Link to={`/products?userId=${userId || "no_name"}`}>Browse Products</Link>
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
            <span className="text-muted-foreground">Payment</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="fullName" 
                          name="fullName"
                          placeholder="John Doe" 
                          value={addressData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                        <Input 
                          id="phoneNumber" 
                          name="phoneNumber"
                          placeholder="10-digit phone number" 
                          value={addressData.phoneNumber}
                          onChange={handleInputChange}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1 <span className="text-red-500">*</span></Label>
                      <Input 
                        id="addressLine1" 
                        name="addressLine1"
                        placeholder="House/Flat No., Building Name" 
                        value={addressData.addressLine1}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input 
                        id="addressLine2" 
                        name="addressLine2"
                        placeholder="Street, Locality" 
                        value={addressData.addressLine2}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                        <Input 
                          id="city" 
                          name="city"
                          placeholder="Bangalore" 
                          value={addressData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                        <Input 
                          id="state" 
                          name="state"
                          placeholder="Karnataka" 
                          value={addressData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode <span className="text-red-500">*</span></Label>
                        <Input 
                          id="pincode" 
                          name="pincode"
                          placeholder="560001" 
                          value={addressData.pincode}
                          onChange={handleInputChange}
                          maxLength={6}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
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

export default AddressPage;
