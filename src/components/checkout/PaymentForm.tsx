import React from 'react';
import { ChevronLeft, ChevronRight, CreditCard, LockIcon } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface PaymentFormProps {
  initialData: {
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvc: string;
    sameAsShipping: boolean;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onSubmit: (values: PaymentFormProps['initialData']) => void;
  onBack: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  initialData, 
  shippingAddress,
  onSubmit,
  onBack 
}) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required('Card number is required')
        .matches(/^\d{16}$/, 'Card number must be 16 digits'),
      cardName: Yup.string().required('Name on card is required'),
      expiry: Yup.string()
        .required('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
      cvc: Yup.string()
        .required('CVC is required')
        .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits')
    }),
    onSubmit: values => {
      onSubmit(values);
    }
  });

  // Format card number as user types
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    formik.setFieldValue('cardNumber', value);
  };

  // Format expiry date as user types
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    formik.setFieldValue('expiry', value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
      
      <form onSubmit={formik.handleSubmit}>
        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-indigo-600 bg-indigo-50 rounded-md p-3 flex items-center justify-center relative">
              <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-sm font-medium">Credit Card</span>
              <div className="absolute top-2 right-2 h-3 w-3 bg-indigo-600 rounded-full"></div>
            </div>
            <div className="border border-gray-300 rounded-md p-3 flex items-center justify-center text-gray-400">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 mr-2" />
              <span className="text-sm font-medium">PayPal</span>
            </div>
            <div className="border border-gray-300 rounded-md p-3 flex items-center justify-center text-gray-400">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-5 mr-2" />
              <span className="text-sm font-medium">Apple Pay</span>
            </div>
          </div>
        </div>
        
        {/* Card Information */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Card Information</h3>
          <div className="border border-gray-300 rounded-md divide-y">
            <div className="p-3">
              <label htmlFor="cardNumber" className="block text-sm text-gray-600 mb-1">
                Card Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full focus:outline-none ${
                    formik.touched.cardNumber && formik.errors.cardNumber ? 'text-red-500' : ''
                  }`}
                  value={formik.values.cardNumber}
                  onChange={handleCardNumberChange}
                  onBlur={formik.handleBlur}
                />
                <div className="flex items-center space-x-1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                </div>
              </div>
              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.cardNumber}</p>
              )}
            </div>
            
            <div className="p-3">
              <label htmlFor="cardName" className="block text-sm text-gray-600 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                placeholder="John Smith"
                className={`w-full focus:outline-none ${
                  formik.touched.cardName && formik.errors.cardName ? 'text-red-500' : ''
                }`}
                value={formik.values.cardName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cardName && formik.errors.cardName && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.cardName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 divide-x">
              <div className="p-3">
                <label htmlFor="expiry" className="block text-sm text-gray-600 mb-1">
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  className={`w-full focus:outline-none ${
                    formik.touched.expiry && formik.errors.expiry ? 'text-red-500' : ''
                  }`}
                  value={formik.values.expiry}
                  onChange={handleExpiryChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.expiry && formik.errors.expiry && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.expiry}</p>
                )}
              </div>
              
              <div className="p-3">
                <label htmlFor="cvc" className="block text-sm text-gray-600 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  className={`w-full focus:outline-none ${
                    formik.touched.cvc && formik.errors.cvc ? 'text-red-500' : ''
                  }`}
                  value={formik.values.cvc}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                    formik.setFieldValue('cvc', value);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cvc && formik.errors.cvc && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.cvc}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Billing Address */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Billing Address</h3>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="sameAsShipping"
              className="h-4 w-4 text-indigo-600 rounded"
              checked={formik.values.sameAsShipping}
              onChange={formik.handleChange}
            />
            <span className="ml-2 text-sm text-gray-600">
              Same as shipping address
            </span>
          </label>
          
          {formik.values.sameAsShipping && (
            <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600">
              <p className="font-medium">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>{shippingAddress.address}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </p>
              <p>
                {shippingAddress.country === 'US' ? 'United States' : 
                 shippingAddress.country === 'CA' ? 'Canada' :
                 shippingAddress.country === 'UK' ? 'United Kingdom' : 'Australia'}
              </p>
            </div>
          )}
        </div>
        
        {/* Security Notice */}
        <div className="flex items-center justify-center mb-8 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <LockIcon className="h-4 w-4 text-green-500 mr-2" />
          <span>Your payment information is secured with SSL encryption</span>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Shipping
          </button>
          
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            Complete Order
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;