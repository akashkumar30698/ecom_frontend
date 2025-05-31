import { ShieldAlert, RefreshCw, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';


const PaymentFailurePage= () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")


  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6 animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={32} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment failed</h2>
        <p className="text-gray-600 max-w-md">We couldn\'t process your payment. Please try again or use a different payment method.</p>
      </div>

      <div className="border-t border-b border-gray-200 py-6 my-6">
        <h3 className="font-medium text-gray-700 mb-4">What would you like to do?</h3>
        <div className="space-y-4">
         <Link
         to={`/?userId=${userId || "no_name"}`}
         >
        <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <RefreshCw size={18} />
            Try payment again
          </button>

         </Link>
         
          

          {
            /**
             
         <button
            onClick={onChangePaymentMethod}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <CreditCard size={18} />
            Use a different payment method
          </button>
             */
          }
        
        </div>
      </div>

      <div className="bg-blue-50 rounded-md p-4 flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-blue-800 text-sm">
            Need help? Our customer support team is available 24/7 to assist you with any payment issues.
          </p>
          <a href="#" className="text-blue-600 text-sm font-medium mt-2 inline-flex items-center hover:text-blue-800">
            Contact support <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;