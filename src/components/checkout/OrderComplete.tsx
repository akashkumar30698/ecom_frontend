import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, TruckIcon, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';



const OrderComplete = () => {

  const [shippingInfo, setShippingInfo] = useState<null | {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(null);
  const location = useLocation();
  const [orderId, setOrderId] = useState(null);
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const order_id = searchParams.get('order_id');
    setOrderId(order_id);
  }, [location.search]);


  useEffect(() => {
    const getShippingInfo = () => {
      const info = sessionStorage.getItem("shippingInfo");
      if (info) {
        try {
          const parsed = JSON.parse(info);
          // Avoid unnecessary updates
          if (JSON.stringify(parsed) !== JSON.stringify(shippingInfo)) {
            setShippingInfo(parsed);
          }
        } catch (err) {
          console.error("Failed to parse shippingInfo:", err);
        }
      } else {
        setShippingInfo(null);
      }
    };

    // Run once immediately
    getShippingInfo();

  }, [shippingInfo]);
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 7);
  
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

 

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
        <p className="text-gray-600 mb-6">
          Your order has been received and is now being processed. We've sent a confirmation email to {shippingInfo?.email}.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="mb-4">
            <span className="text-sm text-gray-500">Order Number:</span>
            <p className="font-semibold">{ orderId }</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex">
              <Calendar className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <div>
                <span className="text-sm text-gray-500 block">Order Date</span>
                <p className="font-medium">
                  {today.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex">
              <Package className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <div>
                <span className="text-sm text-gray-500 block">Shipping Method</span>
                <p className="font-medium">Standard Shipping</p>
              </div>
            </div>
            
            <div className="flex">
              <TruckIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <div>
                <span className="text-sm text-gray-500 block">Estimated Delivery</span>
                <p className="font-medium">{formattedDeliveryDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600">
            {shippingInfo?.firstName} {shippingInfo?.lastName}<br />
            {shippingInfo?.address}<br />
            {shippingInfo?.city}, {shippingInfo?.state} {shippingInfo?.zipCode}<br />
            {shippingInfo?.country === 'IND' ? 'India' : 
             shippingInfo?.country === 'CA' ? 'Canada' :
             shippingInfo?.country === 'UK' ? 'United Kingdom' : 'India'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            to={`/?userId=${userId || "no_name"}`}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>

          {/*
             <Link 
            to={``}
            className="flex-1 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Track Order
          </Link>
          */}
          
       
        </div>
      </div>
      
      {/* Order Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold mb-4">Order Timeline</h3>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="relative flex mb-6">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center z-10">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <h4 className="font-medium">Order Confirmed</h4>
              <p className="text-sm text-gray-500">
                {today.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>


          {/*
          
          <div className="relative flex mb-6">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
              <Package className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-500">Processing</h4>
              <p className="text-sm text-gray-500">Your order is being prepared for shipment</p>
            </div>
          </div>
          
          <div className="relative flex mb-6">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
              <TruckIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-500">Shipping</h4>
              <p className="text-sm text-gray-500">Your order will be on its way soon</p>
            </div>
          </div>
          
          <div className="relative flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
              <CheckCircle className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-500">Delivery</h4>
              <p className="text-sm text-gray-500">Expected by {formattedDeliveryDate}</p>
            </div>
          </div>
          
          */}
          
          
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;