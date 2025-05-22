
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const orderNumber = `ORDER${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-lg font-medium">{orderNumber}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-navy-900 hover:bg-navy-800"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/products")}
              >
                Browse More Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
