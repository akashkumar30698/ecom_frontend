import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderComplete from '../components/checkout/OrderComplete';
import { handleInitiatePayment } from '@/lib/payment';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

type CheckoutStep = 'shipping' | 'payment' | 'complete';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: false
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
    sameAsShipping: true
  });
  const [orderNumber, setOrderNumber] = useState('');
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const handleShippingSubmit = (shippingData: typeof shippingInfo) => {
    setShippingInfo(shippingData);
    setCurrentStep('payment');
    window.scrollTo(0, 0);
    if(sessionStorage.getItem("totalAmount")){
    handleInitiatePayment(`${sessionStorage.getItem("totalAmount")}`,userId)

    }
  };

  const handlePaymentSubmit = (paymentData: typeof paymentInfo) => {
    setPaymentInfo(paymentData);
    // In a real app, you would process the payment here
    // For this demo, we'll just simulate a successful order
    setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setCurrentStep('complete');
    window.scrollTo(0, 0);
  };

  useEffect(()=>{
   if(shippingInfo){
    console.log("order",orderNumber)
    sessionStorage.setItem("shippingInfo",JSON.stringify(shippingInfo))
   }
  },[shippingInfo])

  const getStepClass = (step: CheckoutStep) => {
    const steps: Record<CheckoutStep, number> = {
      shipping: 1,
      payment: 2,
      complete: 3
    };
    
    const currentStepNumber = steps[currentStep];
    const stepNumber = steps[step];
    
    if (stepNumber < currentStepNumber) {
      return 'text-indigo-600 border-indigo-600';
    } else if (stepNumber === currentStepNumber) {
      return 'text-indigo-600 border-indigo-600 bg-indigo-50';
    } else {
      return 'text-gray-400 border-gray-300';
    }
  };

  if (cartItems.length === 0 && currentStep !== 'complete') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
        <Link 
          to={`/products?userId=${userId || "no_name"}`} 
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {currentStep !== 'complete' && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            
            {/* Checkout Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center max-w-md w-full">
                <div className={`flex flex-col items-center ${getStepClass('shipping')}`}>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1">
                    {currentStep !== 'shipping' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>1</span>
                    )}
                  </div>
                  <span className="text-xs">Shipping</span>
                </div>
                
                <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                
                <div className={`flex flex-col items-center ${getStepClass('payment')}`}>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1">
                    {currentStep === 'complete' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>2</span>
                    )}
                  </div>
                  <span className="text-xs">Payment</span>
                </div>
                
                <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                
                <div className={`flex flex-col items-center ${getStepClass('complete')}`}>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1">
                    <span>3</span>
                  </div>
                  <span className="text-xs">Complete</span>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {currentStep === 'shipping' && (
              <ShippingForm 
                initialData={shippingInfo} 
                onSubmit={handleShippingSubmit} 
              />
            )}
            
            {currentStep === 'payment' && (
              <PaymentForm 
                initialData={paymentInfo}
                shippingAddress={shippingInfo}
                onSubmit={handlePaymentSubmit}
                onBack={() => setCurrentStep('shipping')}
              />
            )}
            
            {currentStep === 'complete' && (
              <OrderComplete 
              />
            )}
          </div>
          
          {/* Order Summary */}
          {currentStep !== 'complete' && (
            <div className="lg:w-1/3">
              <CheckoutSummary 
                cartItems={cartItems}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;